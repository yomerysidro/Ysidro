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




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'yomer',
      database: 'leona',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
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
