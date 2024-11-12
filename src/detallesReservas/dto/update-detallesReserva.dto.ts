import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateDetalleReservaDTO {
    @IsOptional()
    @IsString()
    paymentMethod?: string;

    @IsOptional()
    @IsNumber()
    amount?: number;

    // Otros campos que necesites actualizar...
}
