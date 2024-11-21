import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdatePromocionesDTO {
  @IsOptional()
  @IsString()
  nombre?: string; // Actualizar el nombre de la promoción

  @IsOptional()
  @IsString()
  descripcion?: string; // Actualizar la descripción

  @IsOptional()
  @IsNumber()
  descuento?: number; // Actualizar el porcentaje de descuento

  @IsOptional()
  @IsDateString()
  fechaInicio?: string; // Actualizar la fecha de inicio en formato ISO

  @IsOptional()
  @IsDateString()
  fechaFin?: string; // Actualizar la fecha de fin en formato ISO

  @IsOptional()
  @IsString()
  image?: string; // URL de la imagen, opcional al actualizar
}
