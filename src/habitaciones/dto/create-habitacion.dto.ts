import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHabitacionDTO {
  @IsNotEmpty()
  @IsString()
  roomNumber: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  imagePath?: string; // Este campo será asignado en el controlador después de subir la imagen

  @IsOptional()
  @IsString()
  status?: string; // Opcional al crear, por defecto será 'disponible'
}
