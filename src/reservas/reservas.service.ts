import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';
import { CreateReservaDTO } from './dto/create-reserva-dto';
import { Habitacion } from 'src/habitaciones/habitacion.entity';
import { Pago } from 'src/metodoPagos/pago.entity';
import { User } from 'src/users/user.entity';
import { UpdateReservaDTO } from './dto/update-reservas.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository<Habitacion>,
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Repositorio de usuarios
  ) {}

  // Método para crear una reserva
  async createReserva(createReservaDto: CreateReservaDTO): Promise<Reserva> {
    const { habitacionId, pagoId, userId } = createReservaDto;

    // Validar que la habitación exista
    const habitacion = await this.habitacionRepository.findOne({
      where: { id: habitacionId },
    });
    if (!habitacion) {
      throw new NotFoundException(`Habitación con ID ${habitacionId} no encontrada.`);
    }

    // Validar que el pago exista
    const pago = await this.pagoRepository.findOne({
      where: { id: pagoId },
    });
    if (!pago) {
      throw new NotFoundException(`Pago con ID ${pagoId} no encontrado.`);
    }

    // Validar que el usuario exista
    if (!userId || userId === 0) {
      throw new NotFoundException(`El ID de usuario es inválido o no fue proporcionado.`);
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
    }

    // Crear la reserva
    const newReserva = this.reservaRepository.create({
      ...createReservaDto,
      habitacion,
      pago,
      user, // Asocia el usuario
    });

    return await this.reservaRepository.save(newReserva);
  }

  // Obtener todas las reservas
  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      relations: ['habitacion', 'pago', 'user'], // Relacionar entidades necesarias
    });
  }

  // Obtener una reserva por ID
  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['habitacion', 'pago', 'user'], // Relacionar entidades necesarias
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
    }
    return reserva;
  }

  // Actualizar una reserva existente
  async update(id: number, updateReservaDto: UpdateReservaDTO): Promise<Reserva> {
    const reserva = await this.findOne(id);

    // Validar habitación si se proporciona
    if (updateReservaDto.habitacionId) {
      const habitacion = await this.habitacionRepository.findOne({
        where: { id: updateReservaDto.habitacionId },
      });
      if (!habitacion) {
        throw new NotFoundException(`Habitación con ID ${updateReservaDto.habitacionId} no encontrada.`);
      }
      reserva.habitacion = habitacion;
    }

    // Validar pago si se proporciona
    if (updateReservaDto.pagoId) {
      const pago = await this.pagoRepository.findOne({
        where: { id: updateReservaDto.pagoId },
      });
      if (!pago) {
        throw new NotFoundException(`Pago con ID ${updateReservaDto.pagoId} no encontrado.`);
      }
      reserva.pago = pago;
    }

    // Validar usuario si se proporciona
    if (updateReservaDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateReservaDto.userId },
      });
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${updateReservaDto.userId} no encontrado.`);
      }
      reserva.user = user;
    }

    // Actualizar el resto de los campos
    Object.assign(reserva, updateReservaDto);
    return await this.reservaRepository.save(reserva);
  }

  // Eliminar una reserva
  async remove(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    await this.reservaRepository.remove(reserva);
  }
}
