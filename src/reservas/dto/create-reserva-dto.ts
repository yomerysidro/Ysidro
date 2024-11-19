import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateReservaDTO {
  @IsNotEmpty()
  @IsString()
  startDate: string; // Reservation start date

  @IsNotEmpty()
  @IsString()
  endDate: string; // Reservation end date

  @IsOptional()
  @IsString()
  duration?: string; // Optional reservation duration

  @IsOptional()
  @IsString()
  notes?: string; // Optional notes

  @IsNotEmpty()
  @IsNumber() // ID de la habitación
  habitacionId: number;

  @IsNotEmpty()
  @IsNumber() // ID de pago
  pagoId: number;

  @IsNotEmpty()
  @IsNumber() // ID del usuario
  userId: number;
}
