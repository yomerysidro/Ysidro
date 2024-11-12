import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { Payment } from 'mercadopago';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';
import { MercadoPago } from 'mercadopago/dist/mercadoPagoConfig';

@Injectable()
export class TokenService {
  private payment: Payment;

  constructor() {
    this.payment = new Payment(MercadoPago);
  }

  async createToken(cardDetails: {
    amount: number;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    cardholderName: string;
  }): Promise<string> {
    try {
      console.log('Request data:', cardDetails);

      // Obtener el ID del método de pago (Visa) desde la API de MercadoPago
      const paymentMethodId = await this.getPaymentMethodId(cardDetails.cardNumber);

      if (!paymentMethodId) {
        throw new BadRequestException('Método de pago no reconocido o inválido.');
      }

      const cardToken = await this.getCardToken({
        cardNumber: cardDetails.cardNumber.replace(/\s+/g, ''), // Quita espacios
        expirationMonth: cardDetails.expirationMonth,
        expirationYear: cardDetails.expirationYear,
        securityCode: cardDetails.securityCode,
        cardholder: { name: cardDetails.cardholderName },
      });

      const requestBody: PaymentCreateRequest = {
        transaction_amount: cardDetails.amount,
        token: cardToken,
        description: 'Descripción del pago',
        payment_method_id: paymentMethodId, // Usa el ID correcto del método de pago
        payer: {
          email: 'email@ejemplo.com', // Cambia esto por el email del pagador
        },
      };

      const response = await this.payment.create({ body: requestBody });
      console.log('Response:', response);

      if (response && response.id) {
        return response.id.toString();
      } else {
        throw new Error('No se pudo obtener el ID de la respuesta');
      }
    } catch (error) {
      console.error('Error en createToken:', error.response ? error.response.data : error.message);
      throw new BadRequestException(
        `Error al generar el token de la tarjeta: ${error.message}`
      );
    }
  }

  private async getCardToken(cardDetails: {
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    cardholder: { name: string };
  }): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.mercadopago.com/v1/card_tokens',
        {
          card_number: cardDetails.cardNumber,
          expiration_month: cardDetails.expirationMonth,
          expiration_year: cardDetails.expirationYear,
          security_code: cardDetails.securityCode,
          cardholder: { name: cardDetails.cardholder.name },
        },
        {
          headers: {
            'Authorization': `Bearer TEST-5456723910567615-110411-fb6d6bc8fb0c5dbf7be728a1e923b2ca-1741789467`,
          },
        }
      );

      if (response && response.data && response.data.id) {
        return response.data.id;
      } else {
        throw new BadRequestException('No se pudo obtener el token de la tarjeta');
      }
    } catch (error) {
      console.error('Error en getCardToken:', error.response ? error.response.data : error.message);
      throw new BadRequestException(
        `Error al obtener el token de la tarjeta: ${error.message}`
      );
    }
  }

  private async getPaymentMethodId(cardNumber: string): Promise<string | null> {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payment_methods?bin=${cardNumber.substring(0, 6)}`,
        {
          headers: {
            'Authorization': `Bearer TEST-5456723910567615-110411-fb6d6bc8fb0c5dbf7be728a1e923b2ca-1741789467`,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const paymentMethodId = response.data[0].id;
        console.log('Método de pago:', paymentMethodId);
        return paymentMethodId;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener el método de pago:', error.response ? error.response.data : error.message);
      throw new BadRequestException('Error al obtener métodos de pago');
    }
  }
}
