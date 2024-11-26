import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { ReservasModule } from './reservas/reservas.module';
import { PagosModule } from './metodoPagos/pagos.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { ConfigModule } from '@nestjs/config';
import { PromocionesModule } from './promociones/promociones.module';
import { MercadoPagoModule } from './mercado_pago/mercado_pago.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga variables de entorno desde un archivo .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'junction.proxy.rlwy.net',
      port: parseInt(process.env.DB_PORT, 10) || 40839,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'ofqofTRfPMOstJDdgDxeeJugUFyDaPYQ',
      database: process.env.DB_NAME || 'leona',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ajusta la ruta a las entidades
      synchronize: true, // Sincronización automática de entidades
      logging: true, // Logs habilitados para depuración
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ReservasModule,
    PagosModule,
    HabitacionesModule,
    PromocionesModule,
    MercadoPagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
