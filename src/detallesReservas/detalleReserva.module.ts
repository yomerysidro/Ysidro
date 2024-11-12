import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleReservaService } from './detalleReserva.service';
import { DetalleReserva } from './detalleReserva.entity';
import { Reserva } from '../reservas/reserva.entity';
import { DetalleReservaController } from './detalleReservas.controller';
import { Pago } from 'src/metodoPagos/pago.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleReserva, Reserva, Pago, User]),
  ],
  providers: [DetalleReservaService],
  controllers: [DetalleReservaController],
})
export class DetalleReservaModule {}
