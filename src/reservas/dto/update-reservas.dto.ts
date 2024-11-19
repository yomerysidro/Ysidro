import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateReservaDTO {
  @IsOptional()
  @IsString()
  startDate?: string; // Fecha de inicio opcional

  @IsOptional()
  @IsString()
  endDate?: string; // Fecha de fin opcional

  @IsOptional()
  @IsString()
  duration?: string; // Duración opcional

  @IsOptional()
  @IsString()
  notes?: string; // Notas opcionales

  @IsOptional()
  @IsNumber()
  habitacionId?: number; // ID de la habitación opcional

  @IsOptional()
  @IsNumber()
  pagoId?: number; // ID de pago opcional

  @IsOptional()
  @IsNumber()
  userId?: number; // ID del usuario opcional
}
