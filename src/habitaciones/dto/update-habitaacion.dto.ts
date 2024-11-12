import { IsNumber, IsOptional, IsString, IsPositive, MaxLength, IsEnum } from 'class-validator';

export class UpdateHabitacionDTO {
  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'El número de habitación no puede exceder los 10 caracteres' })
  roomNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'La descripción no puede exceder los 200 caracteres' })
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  price?: number;

  @IsOptional()
  @IsString()
  imagePath?: string; // Este campo será asignado en el controlador después de subir la imagen

  @IsOptional()
  @IsEnum(['disponible', 'ocupado', 'mantenimiento'], {
    message: 'El estado debe ser uno de los siguientes valores: disponible, ocupado, mantenimiento',
  })
  status?: string; // Permite actualizar el estado
}
