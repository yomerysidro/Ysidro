import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleReserva } from './detalleReserva.entity';
import { CreateDetalleReservaDTO } from './dto/create-detallesReserva.dto';
import { Pago } from '../metodoPagos/pago.entity';
import { User } from '../users/user.entity';
import { Reserva } from '../reservas/reserva.entity';

@Injectable()
export class DetalleReservaService {
  constructor(
    @InjectRepository(DetalleReserva)
    private readonly detalleReservaRepository: Repository<DetalleReserva>,
    
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async create(createDetalleReservaDTO: CreateDetalleReservaDTO): Promise<DetalleReserva> {
    // Busca el pago, usuario y reserva por sus respectivos IDs
    const [pago, user, reserva] = await Promise.all([
      this.pagoRepository.findOne({ where: { id: createDetalleReservaDTO.pagoId } }),
      this.userRepository.findOne({ where: { id: createDetalleReservaDTO.userId } }),
      this.reservaRepository.findOne({ where: { id: createDetalleReservaDTO.reservaId } }),
    ]);

    if (!pago) throw new NotFoundException('Pago no encontrado');
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (!reserva) throw new NotFoundException('Reserva no encontrada');

    // Crea el detalle de reserva
    const detalleReserva = this.detalleReservaRepository.create({
      user,
      reserva,
      pago,
    });

    // Guarda el detalle de reserva y devuelve el resultado con las relaciones
    return this.detalleReservaRepository.save(detalleReserva);
  }

  async findById(id: number): Promise<DetalleReserva> {
    const detalle = await this.detalleReservaRepository.findOne({
      where: { id },
      relations: ['user', 'reserva', 'pago'],
    });

    if (!detalle) {
      throw new NotFoundException(`Detalle de reserva con ID ${id} no encontrado`);
    }

    return detalle;
  }

  async delete(id: number): Promise<void> {
    const detalle = await this.findById(id);
    await this.detalleReservaRepository.remove(detalle);
  }
}
