import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';
import { identification_type } from './models/identification_type';
import { MERCADO_PAGO_API, MERCADO_PAGO_HEADERS } from 'src/config/config';
import { Installment } from './models/installment';
import { CardTokenBody } from './models/card_token_body';
import { CardTokenResponse } from './models/card_token_response';
import { PaymentBody } from './models/payment_body';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentResponse } from './models/payment_response';
import { Reserva } from 'src/reservas/reserva.entity';
import { User } from 'src/users/user.entity';
import { Habitacion } from 'src/habitaciones/habitacion.entity';
import { Pago } from 'src/metodoPagos/pago.entity';

@Injectable()
export class MercadoPagoService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Habitacion)
    private habitacionRepository: Repository<Habitacion>,
  ) {}

  // IDENTIFICATION TYPE
  getIdentificationTypes(): Observable<AxiosResponse<identification_type[]>> {
    return this.httpService
      .get(MERCADO_PAGO_API + '/identification_types', {
        headers: MERCADO_PAGO_HEADERS,
      })
      .pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      )
      .pipe(map((resp) => resp.data));
  }

  // Obtener cuotas disponibles
  getInstallments(
    firstSixDigits: number,
    amount: number,
  ): Observable<Installment> {
    return this.httpService
      .get(
        MERCADO_PAGO_API +
          `/payment_methods/installments?bin=${firstSixDigits}&amount=${amount}`,
        { headers: MERCADO_PAGO_HEADERS },
      )
      .pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      )
      .pipe(map((resp: AxiosResponse<Installment>) => resp.data[0]));
  }

  // Crear token de tarjeta
  createCardToken(
    cardTokenBody: CardTokenBody,
  ): Observable<CardTokenResponse> {
    return this.httpService
      .post(
        MERCADO_PAGO_API +
          `/card_tokens?public_key=TEST-e942d32a-650e-43a9-b49d-184c0db06b1e`,
        cardTokenBody,
        { headers: MERCADO_PAGO_HEADERS },
      )
      .pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      )
      .pipe(map((resp: AxiosResponse<CardTokenResponse>) => resp.data));
  }

  async createPayment(paymentBody: PaymentBody): Promise<Observable<SimplifiedPaymentResponse>> {
    console.log('Headers recibidos:', MERCADO_PAGO_HEADERS);
    console.log('paymentBody recibido:', paymentBody);

    const queryRunner = this.reservaRepository.manager.connection.createQueryRunner();

    // Iniciar conexión y transacción
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // Validar y acceder a userId y habitacionId desde order
        const userId = paymentBody.reserva?.userId;
        const habitacionId = paymentBody.reserva?.habitacionId;

        if (!userId) {
            throw new HttpException('El campo userId es requerido', 400);
        }

        if (!habitacionId) {
            throw new HttpException('El campo habitacionId es requerido', 400);
        }

        // Validar y buscar usuario
        const user = await queryRunner.manager.findOne(User, {
            where: { id: userId },
        });
        if (!user) {
            throw new HttpException('Usuario no encontrado', 404);
        }

        // Validar y buscar habitación
        const habitacion = await queryRunner.manager.findOne(Habitacion, {
            where: { id: habitacionId },
        });
        if (!habitacion) {
            throw new HttpException('Habitación no encontrada', 404);
        }

        // Crear reserva con relaciones
        const newReserva = new Reserva();
        newReserva.startDate = paymentBody.reserva.startDate;
        newReserva.endDate = paymentBody.reserva.endDate;
        newReserva.duration = paymentBody.reserva.duration;
        newReserva.notes = paymentBody.reserva.notes;
        newReserva.user = { id: user.id } as User; // Guardar solo el ID del usuario
        newReserva.habitacion = { id: habitacion.id } as Habitacion; // Guardar solo el ID de la habitación

        const savedReserva = await queryRunner.manager.save(newReserva);
        console.log('Reserva creada en la base de datos:', savedReserva);

        // Preparar el payload para Mercado Pago
        const mercadoPagoPayload = {
            transaction_amount: paymentBody.transaction_amount,
            token: paymentBody.token,
            installments: paymentBody.installments,
            issuer_id: paymentBody.issuer_id,
            payment_method_id: paymentBody.payment_method_id,
            payer: paymentBody.payer,
        };

        // Llamar a la API de Mercado Pago
        const paymentResponse = await this.httpService
            .post(MERCADO_PAGO_API + '/payments', mercadoPagoPayload, {
                headers: MERCADO_PAGO_HEADERS,
            })
            .pipe(
                map((resp: AxiosResponse<PaymentResponse>) => resp.data),
                catchError((error: AxiosError) => {
                    console.error('Error en la creación del pago:', error.message);
                    throw new HttpException(
                        error.response?.data || 'Error desconocido',
                        error.response?.status || 500,
                    );
                }),
            )
            .toPromise();

        console.log('Respuesta de Mercado Pago:', paymentResponse);

        // Actualizar la reserva con el ID del pago
       // newReserva.pago = { id: paymentResponse.id } as Pago; // CORRECTO

        await queryRunner.manager.save(savedReserva);
        console.log('Reserva actualizada con el ID del pago:', savedReserva);

        // Confirmar transacción
        await queryRunner.commitTransaction();

        // Retornar como Observable
        return new Observable<SimplifiedPaymentResponse>((subscriber) => {
            const simplifiedResponse = this.simplifyPaymentResponse(paymentResponse);
            subscriber.next(simplifiedResponse);
            subscriber.complete();
        });
    } catch (error) {
        console.error('Error en el procesamiento:', error.message);

        // Revertir la transacción si ocurre un error
        await queryRunner.rollbackTransaction();
        throw new HttpException(error.message || 'Error interno', 500);
    } finally {
        // Liberar el QueryRunner
        await queryRunner.release();
    }
}


  private simplifyPaymentResponse(
    response: PaymentResponse,
  ): SimplifiedPaymentResponse {
    const simplified = {
      id: response.id,
      status: response.status,
      transaction_amount: response.transaction_amount,
      payment_method_id: response.payment_method_id,
      payer: { email: response.payer.email },
    };
    console.log('Respuesta simplificada:', simplified);
    return simplified;
  }
}
