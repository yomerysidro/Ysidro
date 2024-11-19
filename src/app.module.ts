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
      type: 'mysql', // Tipo de base de datos
      host: process.env.DB_HOST || 'localhost', // Host (usa variable de entorno o 'localhost' por defecto)
      port: parseInt(process.env.DB_PORT, 10) || 3306, // Puerto (usa variable de entorno o 3306 por defecto)
      username: process.env.DB_USERNAME || 'root', // Usuario
      password: process.env.DB_PASSWORD || 'yomer', // Contraseña
      database: process.env.DB_NAME || 'leona', // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Rutas a las entidades
      synchronize: process.env.TYPEORM_SYNC === 'true' || true, // Sincroniza el esquema (desactiva en producción)
      logging: process.env.TYPEORM_LOGGING === 'true' || true, // Habilita logs de depuración
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ReservasModule,
    PagosModule,
    DetalleReservaModule,
    HabitacionesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
