import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';
import { CreateReservaDTO } from './dto/create-reserva-dto';
import { Habitacion } from 'src/habitaciones/habitacion.entity';
import { Pago } from 'src/metodoPagos/pago.entity';
import { UpdateReservaDTO } from './dto/update-reservas.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository<Habitacion>,
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>, // Inyecta el repositorio de Pago
  ) {}

  async createReserva(createReservaDto: CreateReservaDTO): Promise<Reserva> {
    const habitacion = await this.habitacionRepository.findOne({
      where: { id: createReservaDto.habitacionId },
    });
    if (!habitacion) {
      throw new NotFoundException(`Habitación con ID ${createReservaDto.habitacionId} no encontrada.`);
    }

    const pago = await this.pagoRepository.findOne({
      where: { id: createReservaDto.pagoId },
    });
    if (!pago) {
      throw new NotFoundException(`Pago con ID ${createReservaDto.pagoId} no encontrado.`);
    }

    const newReserva = this.reservaRepository.create({
      ...createReservaDto,
      habitacion,
      pago, // Asocia el objeto Pago
    });

    return await this.reservaRepository.save(newReserva);
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.find();
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
    }
    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDTO): Promise<Reserva> {
    const reserva = await this.findOne(id);

    if (updateReservaDto.habitacionId) {
      const habitacion = await this.habitacionRepository.findOne({
        where: { id: updateReservaDto.habitacionId },
      });
      if (!habitacion) {
        throw new NotFoundException(`Habitación con ID ${updateReservaDto.habitacionId} no encontrada.`);
      }
      reserva.habitacion = habitacion;
    }

    if (updateReservaDto.pagoId) {
      const pago = await this.pagoRepository.findOne({
        where: { id: updateReservaDto.pagoId },
      });
      if (!pago) {
        throw new NotFoundException(`Pago con ID ${updateReservaDto.pagoId} no encontrado.`);
      }
      reserva.pago = pago;
    }

    Object.assign(reserva, updateReservaDto);
    return await this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    await this.reservaRepository.remove(reserva);
  }
}
