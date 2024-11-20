import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadoPagoService } from './mercado_pago.service';
import { MercadoPagoController } from './mercado_pago.controller';
import { Reserva } from 'src/reservas/reserva.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Reserva])],
  providers: [MercadoPagoService],
  controllers: [MercadoPagoController],
})
export class MercadoPagoModule {}
