// src/metodoPagos/pagos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { Pago } from './pago.entity';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pago])],
  providers: [PagosService, TokenService],
  controllers: [PagosController],
  exports: [TypeOrmModule],
})
export class PagosModule {}
