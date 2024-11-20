import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentBody } from './models/payment_body';
import { PaymentResponse } from './models/payment_response';
import { Reserva } from 'src/reservas/reserva.entity';

@Injectable()
export class MercadoPagoService {
    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(Reserva) private reservasRepository: Repository<Reserva>,
    ) {}

    async createPayment(paymentBody: PaymentBody): Promise<PaymentResponse> {
        // Verificar que la reserva exista
        const reserva = await this.reservasRepository.findOne({ where: { id: paymentBody.reserva.id } });
        if (!reserva) {
            throw new HttpException('Reserva no encontrada', 404);
        }

        // Eliminar la reserva del cuerpo antes de enviar a MercadoPago
        delete paymentBody.reserva;

        // Procesar el pago con MercadoPago
        const response = await this.httpService.post(
            'https://api.mercadopago.com/v1/payments',
            paymentBody,
            { headers: { Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}` } },
        ).pipe(
            map((res) => res.data),
            catchError((error) => {
                throw new HttpException(error.response.data, error.response.status);
            }),
        ).toPromise();

        return response;
    }
}
