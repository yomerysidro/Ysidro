import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { ReservasModule } from './reservas/reservas.module';
import { PagosModule } from './metodoPagos/pagos.module';
import { DetalleReservaModule } from './detallesReservas/detalleReserva.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import * as dotenv from 'dotenv';

// Cargar las variables de entorno desde un archivo .env
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost', // Host
      port: parseInt(process.env.DB_PORT, 10) || 3306, // Puerto
      username: process.env.DB_USERNAME || 'root', // Usuario
      password: process.env.DB_PASSWORD || 'yomer', // Contraseña
      database: process.env.DB_NAME || 'leona', // Base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entidades
      synchronize: process.env.TYPEORM_SYNC === 'true' || true, // Sincronización
      logging: process.env.TYPEORM_LOGGING === 'true' || true, // Logs
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ReservasModule,
    PagosModule,
    DetalleReservaModule,
    HabitacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
