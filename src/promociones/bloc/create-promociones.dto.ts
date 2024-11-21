import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePromocionesDTO {
  @IsNotEmpty()
  @IsString()
  nombre: string; // Nombre de la promoción

  @IsNotEmpty()
  @IsString()
  descripcion: string; // Breve descripción

  @IsNotEmpty()
  @IsNumber()
  descuento: number; // Porcentaje de descuento

  @IsNotEmpty()
  @IsString()
  fechaInicio: string; // Fecha en formato ISO

  @IsNotEmpty()
  @IsString()
  fechaFin: string; // Fecha en formato ISO

  @IsNotEmpty()
  @IsString()
  image: string; // URL de la imagen
}
