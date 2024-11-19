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

// Cargar las variables de entorno desde .env en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'leona',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.TYPEORM_SYNC === 'true' || false, // Desactiva en producción
      logging: process.env.TYPEORM_LOGGING === 'true' || false,
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
