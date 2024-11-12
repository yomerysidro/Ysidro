// src/metodoPagos/pagos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pago.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ) {}

  async createPago(createPagoDto: CreatePagoDto): Promise<Pago> {
    const {
      cardNumber,
      cvv,
      amount,
      cardholderName,
      expirationMonth,
      expirationYear,
      paymentMethod,
    } = createPagoDto;

    // Validar que el método de pago sea solo "Visa"
    if (paymentMethod.toLowerCase() !== 'visa') {
      throw new BadRequestException('Solo se aceptan pagos con tarjeta Visa');
    }

    // Verificar si la tarjeta ya fue registrada para el titular
    const existingPago = await this.pagoRepository.findOne({
      where: { cardNumber, cardholderName },
    });

    if (existingPago) {
      throw new BadRequestException('La tarjeta ya ha sido registrada con este titular.');
    }

    // Crear el pago
    const pago = this.pagoRepository.create({
      amount,
      status: 'confirmed',
      paymentMethod,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
      cardholderName,
    });

    return await this.pagoRepository.save(pago);
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoRepository.find();
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({ where: { id } });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    return pago;
  }

  async updatePago(id: number, updatePagoDto: CreatePagoDto): Promise<Pago> {
    const existingPago = await this.pagoRepository.findOne({ where: { id } });

    if (!existingPago) {
      throw new NotFoundException('Pago no encontrado');
    }

    const updatedPago = Object.assign(existingPago, updatePagoDto);
    return await this.pagoRepository.save(updatedPago);
  }

  async remove(id: number): Promise<void> {
    const existingPago = await this.pagoRepository.findOne({ where: { id } });

    if (!existingPago) {
      throw new NotFoundException('Pago no encontrado');
    }

    await this.pagoRepository.remove(existingPago);
  }
}
