import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from './habitacion.entity';
import { HabitacionesService } from './habitaciones.service';
import { HabitacionesController } from './habitaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion])],
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
  exports: [TypeOrmModule.forFeature([Habitacion])], // Exporta el módulo para que otros módulos puedan usar Habitacion
})
export class HabitacionesModule {}
