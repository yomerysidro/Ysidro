// update-pago.dto.ts
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdatePagoDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  cardNumber?: string;

  @IsOptional()
  @IsString()
  expirationDate?: string;

  @IsOptional()
  @IsString()
  cvv?: string;
}