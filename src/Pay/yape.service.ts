import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as mercadopago from 'mercadopago';

@Injectable()
export class YapeService {
  constructor() {
    // Configuración del accessToken
    (mercadopago as any).configure({
      access_token: process.env.ACCESS_TOKEN || 'TEST-ACCESS-TOKEN', // Token de prueba
    });
  }

  // Obtener token de Yape
  async obtenerTokenYape(phoneNumber: string, otp: string): Promise<any> {
    if (!phoneNumber || !otp) {
      throw new HttpException('Número de teléfono y OTP son requeridos', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      phoneNumber,
      otp,
      requestId: uuidv4(),
    };

    try {
      const response = await (mercadopago as any).payments.create(payload);
      return response.body;
    } catch (error) {
      console.error('Error al obtener el token de Yape:', error);
      throw new HttpException(
        { error: 'Error al obtener el token de Yape', details: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Crear un pago con Yape
  async crearPagoYape(token: string, transactionAmount: number, email: string): Promise<any> {
    if (!token || !transactionAmount || !email) {
      throw new HttpException('Token, monto de transacción y correo electrónico son requeridos', HttpStatus.BAD_REQUEST);
    }

    const paymentData = {
      transaction_amount: transactionAmount,
      description: 'Pago con Yape',
      payment_method_id: 'yape',
      installments: 1,
      payer: {
        email,
      },
      token,
    };

    try {
      const response = await (mercadopago as any).payments.create(paymentData);
      return response.body;
    } catch (error) {
      console.error('Error al crear el pago con Yape:', error);
      throw new HttpException(
        { error: 'Error al crear el pago con Yape', details: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
