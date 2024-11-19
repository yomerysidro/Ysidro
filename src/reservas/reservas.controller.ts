import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { Reserva } from './reserva.entity';
import { CreateReservaDTO } from './dto/create-reserva-dto';
import { UpdateReservaDTO } from './dto/update-reservas.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post('create')
  async create(@Body() createReservaDto: CreateReservaDTO): Promise<Reserva> {
    return this.reservasService.createReserva(createReservaDto);
  }

  @Get()
  async findAll(): Promise<Reserva[]> {
    const reservas = await this.reservasService.findAll();
    return reservas.map(reserva => ({
      ...reserva,
      habitacion: reserva.habitacion,
      pago: reserva.pago,
      user: reserva.user, // Incluye el usuario relacionado
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Reserva> {
    const reserva = await this.reservasService.findOne(id);
    return {
      ...reserva,
      habitacion: reserva.habitacion,
      pago: reserva.pago,
      user: reserva.user, // Incluye el usuario relacionado
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReservaDto: UpdateReservaDTO,
  ): Promise<Reserva> {
    return this.reservasService.update(id, updateReservaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.reservasService.remove(id);
  }
}
