import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
