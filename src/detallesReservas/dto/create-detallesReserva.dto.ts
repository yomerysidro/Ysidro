import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetalleReservaDTO {
    @IsNotEmpty()
    @IsNumber()
    reservaId: number; // ID de la reserva

    @IsNotEmpty()
    @IsNumber()
    userId: number; // ID del usuario

    @IsNotEmpty()
    @IsNumber()
    pagoId: number; // ID del pago

    // Agrega cualquier otro campo necesario...
}
