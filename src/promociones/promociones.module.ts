import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promociones } from './promociones.entity';
import { PromocionesController } from './promociones.controller';
import { PromocionesService } from './promociones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Promociones])], // Registra la entidad
  controllers: [PromocionesController], // Registra el controlador
  providers: [PromocionesService], // Registra el servicio
})
export class PromocionesModule {}
