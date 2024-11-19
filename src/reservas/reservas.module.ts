import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { Reserva } from './reserva.entity';
import { Habitacion } from '../habitaciones/habitacion.entity'; // Importa la entidad Habitacion
import { Pago } from 'src/metodoPagos/pago.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Habitacion, Pago]), // Registra las entidades relacionadas con este módulo
    UsersModule, // Importa el módulo de usuarios
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
