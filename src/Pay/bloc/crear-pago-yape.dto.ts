import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CrearPagoYapeDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsNumber()
  @IsNotEmpty()
  transactionAmount: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
