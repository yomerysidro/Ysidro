import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as mercadopago from 'mercadopago';  // Importamos el SDK de Mercado Pago

@Injectable()
export class YapeService {
  constructor() {}

  /**
   * Método para obtener el token de Yape
   */
  async obtenerTokenYape(phoneNumber: string, otp: string): Promise<any> {
    if (!phoneNumber || !otp) {
      throw new HttpException('Número de teléfono y OTP son requeridos', HttpStatus.BAD_REQUEST);
    }

    const url = `https://api.mercadopago.com/platforms/pci/yape/v1/payment?public_key=TEST-8f448c05-c6aa-4849-b55b-5d86e9f03507`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
    const payload = {
      phoneNumber,
      otp,
      requestId: uuidv4(),
    };

    try {
      //const response = await mercadopago.request.post(url, payload, { headers });
     // return response.body;  // Devuelve la respuesta del token generado
    } catch (error) {
      console.error('Error al generar el token de Yape:', error);
      throw new HttpException(
        { error: 'Error al generar el token de Yape', details: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Método para crear un pago con Yape
   */
  async crearPagoYape(token: string, transactionAmount: number, email: string): Promise<any> {
    if (!token || !transactionAmount || !email) {
      throw new HttpException('Token, monto de transacción y correo electrónico son requeridos', HttpStatus.BAD_REQUEST);
    }

    const paymentData = {
      transaction_amount: transactionAmount,  // Monto de la transacción
      description: 'Descripción del producto',  // Descripción del producto
      payment_method_id: 'yape',  // El ID del método de pago
      installments: 1,  // Siempre será 1 con Yape
      payer: {
        email,  // Correo del pagador
      },
      token,  // Token generado previamente con Yape
    };

    try {
     // const paymentResponse = await mercadopago.payment.create(paymentData);  // Usamos el SDK de Mercado Pago para crear el pago
      //console.log('Respuesta del pago:', paymentResponse.body);  // Log de depuración
      //return paymentResponse.body;  // Retorna la respuesta completa del pago
    } catch (error) {
      console.error('Error al crear el pago:', error);
      throw new HttpException(
        { error: 'Error al realizar el pago', details: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
