import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Tipo de base de datos
      url: 'mysql://root:wDRkXpjDddKXBkDTKZayefGUElAhxLGe@autorack.proxy.rlwy.net:14983/railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ajustar según la estructura del proyecto
      synchronize: process.env.TYPEORM_SYNC === 'true', // Sincronización automática de entidades (solo en desarrollo)
      logging: process.env.TYPEORM_LOGGING === 'true', // Habilitar logs si es necesario
    }),
  ],
})
export class AppModule {}
