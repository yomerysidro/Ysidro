import { Module } from '@nestjs/common';
import { PagosController } from './Payment.controller';
import { PagosService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from 'src/habitaciones/habitacion.entity';
import { Reserva } from 'src/reservas/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, Reserva])], // Registra las entidades usadas
  controllers: [PagosController], // Controlador para manejar rutas
  providers: [PagosService], // Servicio con lógica del negocio
})
export class PaymentModule {}
