import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promociones } from './promociones.entity';
import { CreatePromocionesDTO } from './bloc/create-promociones.dto';
import { UpdatePromocionesDTO } from './bloc/uodate-promociones.dto';
import storage = require('../util/cloud_storage'); // Utilidad para gestionar almacenamiento de imágenes

@Injectable()
export class PromocionesService {
  constructor(
    @InjectRepository(Promociones)
    private readonly promocionesRepository: Repository<Promociones>,
  ) {}

  // Obtener todas las promociones
  findAll() {
    return this.promocionesRepository.find();
  }

  // Crear una promoción con imagen
  async create(file: Express.Multer.File, createPromocionDto: CreatePromocionesDTO) {
    const url = await storage(file, file.originalname);

    if (!url) {
      throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    createPromocionDto.image = url;
    const nuevaPromocion = this.promocionesRepository.create(createPromocionDto);
    return this.promocionesRepository.save(nuevaPromocion);
  }

  // Actualizar una promoción sin cambiar la imagen
  async update(id: number, updatePromocionDto: UpdatePromocionesDTO) {
    const promocion = await this.promocionesRepository.findOneBy({ id });

    if (!promocion) {
      throw new HttpException('La promoción no existe', HttpStatus.NOT_FOUND);
    }

    const promocionActualizada = Object.assign(promocion, updatePromocionDto);
    return this.promocionesRepository.save(promocionActualizada);
  }

  // Actualizar una promoción con una nueva imagen
  async updateWithImage(
    file: Express.Multer.File,
    id: number,
    updatePromocionDto: UpdatePromocionesDTO,
  ) {
    const url = await storage(file, file.originalname);

    if (!url) {
      throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const promocion = await this.promocionesRepository.findOneBy({ id });

    if (!promocion) {
      throw new HttpException('La promoción no existe', HttpStatus.NOT_FOUND);
    }

    updatePromocionDto.image = url;
    const promocionActualizada = Object.assign(promocion, updatePromocionDto);
    return this.promocionesRepository.save(promocionActualizada);
  }

  // Eliminar una promoción
  async delete(id: number) {
    const promocion = await this.promocionesRepository.findOneBy({ id });

    if (!promocion) {
      throw new HttpException('La promoción no existe', HttpStatus.NOT_FOUND);
    }

    return this.promocionesRepository.delete(id);
  }
}
 