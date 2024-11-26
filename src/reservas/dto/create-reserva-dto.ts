import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString, Min, ValidateNested } from 'class-validator';

export class CreateReservaDTO {
  
  id?: number; // ID único de la reserva (opcional, por ejemplo, para actualizaciones)
  startDate: string; // Fecha de inicio de la reserva
  endDate: string; // Fecha de fin de la reserva
 duration?: string; // Duración opcional de la reserva
  notes?: string; // Notas opcionales
  habitacionId: number; // ID de la habitación asociada
  pagoId: number; // ID del pago asociado
  userId: number; // ID del usuario asociado

 
}
