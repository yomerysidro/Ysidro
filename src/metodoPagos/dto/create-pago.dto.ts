// src/metodoPagos/dto/create-pago.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePagoDto {
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cvv: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  cardholderName: string;

  @IsNotEmpty()
  @IsNumber()
  expirationMonth: number;

  @IsNotEmpty()
  @IsNumber()
  expirationYear: number;
}
