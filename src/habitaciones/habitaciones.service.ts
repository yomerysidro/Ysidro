import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from './habitacion.entity';
import { CreateHabitacionDTO } from './dto/create-habitacion.dto';
import { UpdateHabitacionDTO } from './dto/update-habitaacion.dto';

@Injectable()
export class HabitacionesService {
  constructor(
    @InjectRepository(Habitacion)
    private habitacionRepository: Repository<Habitacion>,
  ) {}

  async findAll(): Promise<Habitacion[]> {
    return await this.habitacionRepository.find();
  }

  async findOne(id: number): Promise<Habitacion> {
    const habitacion = await this.habitacionRepository.findOne({ where: { id } });
    if (!habitacion) {
      throw new NotFoundException(`Habitación con ID ${id} no encontrada`);
    }
    return habitacion;
  }

  async create(createHabitacionDto: CreateHabitacionDTO): Promise<Habitacion> {
    const nuevaHabitacion = this.habitacionRepository.create(createHabitacionDto);
    return await this.habitacionRepository.save(nuevaHabitacion);
  }

  async update(id: number, updateHabitacionDto: UpdateHabitacionDTO): Promise<Habitacion> {
    const habitacion = await this.findOne(id);
    if (!habitacion) {
      throw new NotFoundException(`Habitación con ID ${id} no encontrada`);
    }
    Object.assign(habitacion, updateHabitacionDto);
    return await this.habitacionRepository.save(habitacion);
  }

  async updateStatus(id: number, status: string): Promise<Habitacion> {
    const habitacion = await this.findOne(id);
    if (!habitacion) {
      throw new NotFoundException(`Habitación con ID ${id} no encontrada`);
    }

    habitacion.status = status;
    return await this.habitacionRepository.save(habitacion);
  }

  async remove(id: number): Promise<void> {
    const habitacion = await this.findOne(id);
    await this.habitacionRepository.remove(habitacion);
  }
}
