import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateReservaDTO {
  @IsOptional()
  @IsNumber()
  id?: number; // ID único de la reserva (opcional, por ejemplo, para actualizaciones)

  @IsNotEmpty()
  @IsDateString()
  startDate: string; // Fecha de inicio de la reserva

  @IsNotEmpty()
  @IsDateString()
  endDate: string; // Fecha de fin de la reserva

  @IsOptional()
  @IsString()
  duration?: string; // Duración opcional de la reserva

  @IsOptional()
  @IsString()
  notes?: string; // Notas opcionales

  @IsNotEmpty()
  @IsNumber()
  habitacionId: number; // ID de la habitación asociada

  @IsNotEmpty()
  @IsNumber()
  pagoId: number; // ID del pago asociado

  @IsNotEmpty()
  @IsNumber()
  userId: number; // ID del usuario asociado
}
