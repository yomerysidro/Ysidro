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

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga variables de entorno desde un archivo .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'junction.proxy.rlwy.net', // Asegúrate de que esta variable esté bien configurada
      port: parseInt(process.env.DB_PORT, 10) || 49599, // Usar variable de entorno o valor por defecto
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'iAjKNTFmOLCUYSsjAOdukCMWkzwsNtqd',
      database: process.env.DB_NAME || 'leona',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Asegúrate de que la ruta de las entidades esté correcta
      synchronize: true, // Sincronización automática de entidades
      logging: true, // Habilita los logs para ver las consultas SQL
      //mysql://root:iAjKNTFmOLCUYSsjAOdukCMWkzwsNtqd@junction.proxy.rlwy.net:49599/leona
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ReservasModule,
    PagosModule,
    HabitacionesModule,
    PromocionesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
