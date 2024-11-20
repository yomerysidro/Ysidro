

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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'autorack.proxy.rlwy.net', // Host de Railway
      port: 20981, // Puerto
      username: 'root', // Usuario
      password: 'sfdPMTTgYyIgdLmPrVPYxKGLEmtkmGSX', // Contraseña
      database: 'leona', // Nombre de tu base de datos personalizada
      entities: [__dirname + '/*/.entity{.ts,.js}'], // Ruta de las entidades
      synchronize: true, // Sincronización automática de entidades
      logging: true, // Logs SQL
    }),
    //mysql://root:sfdPMTTgYyIgdLmPrVPYxKGLEmtkmGSX@autorack.proxy.rlwy.net:20981/railway
    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ReservasModule,
    PagosModule,
    HabitacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}