import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoController } from './mercado-pago.controller';
import { HttpModule } from '@nestjs/axios'; // Asegúrate de importar HttpModule aquí

@Module({
  imports: [HttpModule],  // Asegúrate de importar HttpModule
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class MercadoPagoModule {}
