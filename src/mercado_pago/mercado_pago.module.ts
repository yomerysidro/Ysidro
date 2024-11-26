import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado_pago.service';
import { MercadoPagoController } from './mercado_pago.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from 'src/reservas/reserva.entity';
import { User } from 'mercadopago';
import { Habitacion } from 'src/habitaciones/habitacion.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Reserva, User, Habitacion])],
  providers: [MercadoPagoService],
  controllers: [MercadoPagoController]
})
export class MercadoPagoModule {}
