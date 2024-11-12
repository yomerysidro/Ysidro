import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { Reserva } from './reserva.entity';
import { Habitacion } from '../habitaciones/habitacion.entity'; // Importa la entidad Habitacion
import { PagosModule } from '../metodoPagos/pagos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Habitacion]), // Agrega Habitacion al TypeOrmModule
    PagosModule,
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
