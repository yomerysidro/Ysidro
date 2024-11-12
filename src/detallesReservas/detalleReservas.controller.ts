import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DetalleReservaService } from './detalleReserva.service';
import { CreateDetalleReservaDTO } from './dto/create-detallesReserva.dto';
import { DetalleReserva } from './detalleReserva.entity';

@Controller('detalles-reserva')
export class DetalleReservaController {
    constructor(private readonly detalleReservaService: DetalleReservaService) {}

    // Crear un nuevo detalle de reserva
    @Post()
    async create(@Body() createDetalleReservaDTO: CreateDetalleReservaDTO): Promise<DetalleReserva> {
        return this.detalleReservaService.create(createDetalleReservaDTO);
    }

    // Obtener detalle de reserva por ID
    @Get(':id')
    async getById(@Param('id') id: number): Promise<DetalleReserva> {
        return this.detalleReservaService.findById(id);
    }
}
