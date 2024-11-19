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

// Cargar las variables de entorno desde el archivo .env (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL || 'mysql://root:yomer@localhost:3306/leona', // Usa DATABASE_URL para producción
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Configuración de entidades
      synchronize: process.env.TYPEORM_SYNC === 'true' || false, // Sincronización desactivada en producción
      logging: process.env.TYPEORM_LOGGING === 'true' || false, // Logs de consultas desactivados por defecto
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
