// src/metodoPagos/pagos.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { Pago } from './pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(
    private readonly pagosService: PagosService,
  ) {}

  @Post() 
  async create(@Body() createPagoDto: CreatePagoDto): Promise<Pago> {
    const { paymentMethod, amount } = createPagoDto;

    // Validar que el monto sea válido
    if (isNaN(amount) || amount <= 0) {
      throw new BadRequestException('Monto de la transacción inválido');
    }

    // Validar que el método de pago sea solo "Visa"
    if (paymentMethod.toLowerCase() !== 'visa') {
      throw new BadRequestException('Solo se aceptan pagos con tarjeta Visa');
    }

    return await this.pagosService.createPago(createPagoDto);
  }

  @Get()
  async findAll(): Promise<Pago[]> {
    return await this.pagosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pago> {
    return await this.pagosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePagoDto: CreatePagoDto,
  ): Promise<Pago> {
    return await this.pagosService.updatePago(id, updatePagoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.pagosService.remove(id);
  }
}
