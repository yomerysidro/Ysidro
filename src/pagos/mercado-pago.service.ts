import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Importa desde '@nestjs/axios'
import { AxiosResponse } from 'axios';

@Injectable()
export class MercadoPagoService {
  private readonly PUBLIC_KEY = "TEST-8f448c05-c6aa-4849-b55b-5d86e9f03507"; // Reemplaza con tu Public Key de prueba
  private readonly ACCESS_TOKEN = "TEST-8726023595325015-102113-ee0d634f1d10dbf6f5e3c1cdf052013c-2050866480"; // Reemplaza con tu Access Token de prueba

  constructor(private httpService: HttpService) {}

  // Obtener token de Yape
  // MercadoPagoService
async obtenerTokenYape(phoneNumber: string, otp: string): Promise<any> {
  if (!phoneNumber || !otp) {
    throw new HttpException('Número de teléfono y OTP son requeridos', HttpStatus.BAD_REQUEST);
  }

  const url = `https://api.mercadopago.com/platforms/pci/yape/v1/payment?public_key=${this.PUBLIC_KEY}`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${this.ACCESS_TOKEN}`,
  };

  const payload = {
    phoneNumber,
    otp,
    requestId: this.generateRequestId(), // Genera un requestId único
  };

  try {
    const response: AxiosResponse = await this.httpService.post(url, payload, { headers }).toPromise();
    return response.data;
  } catch (error) {
    console.error('Error al generar el token de Yape:', error.response?.data || error.message); // Agrega detalles del error
    throw new HttpException('Error al generar el token de Yape', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  // Crear el pago con Yape usando el token
  // MercadoPagoService
// MercadoPagoService
async crearPagoYape(token: string, transactionAmount: number, email: string): Promise<any> {
  if (!token || !transactionAmount || !email) {
    throw new HttpException('Token, monto de transacción y correo electrónico son requeridos', HttpStatus.BAD_REQUEST);
  }

  const url = 'https://api.mercadopago.com/v1/payments';
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${this.ACCESS_TOKEN}`,
    "X-Idempotency-Key": this.generateIdempotencyKey(), // Añadir el encabezado X-Idempotency-Key
  };

  const paymentData = {
    transaction_amount: transactionAmount,
    description: "Descripción del producto",
    payment_method_id: "yape",
    installments: 1,
    payer: {
      email,
    },
    token,
  };

  try {
    const response: AxiosResponse = await this.httpService.post(url, paymentData, { headers }).toPromise();
    return response.data;
  } catch (error) {
    console.error('Error al realizar el pago:', error.response?.data || error.message);
    throw new HttpException('Error al realizar el pago', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

// Método para generar un identificador único para el encabezado X-Idempotency-Key
private generateIdempotencyKey(): string {
  return `idempotency-${Date.now()}-${Math.random().toString(36).substring(2)}`;
}



  // Generar un requestId único
  private generateRequestId(): string {
    return (Math.random() * 1e32).toString(36);
  }
}
