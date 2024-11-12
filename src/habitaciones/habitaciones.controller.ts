import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HabitacionesService } from './habitaciones.service';
import { CreateHabitacionDTO } from './dto/create-habitacion.dto';
import { Habitacion } from './habitacion.entity';
import { extname } from 'path';
import { UpdateHabitacionDTO } from './dto/update-habitaacion.dto';

@Controller('habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  @Get()
  async findAll(): Promise<Habitacion[]> {
    return this.habitacionesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Habitacion> {
    return this.habitacionesService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/habitaciones',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
      },
    }),
  }))
  async create(
    @Body() createHabitacionDto: CreateHabitacionDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Habitacion> {
    // Si hay un archivo, lo sube al storage y asigna la URL generada
    if (file) {
      createHabitacionDto.imagePath = file.path; // Guarda la ruta local en imagePath
    } else if (!file && createHabitacionDto.imagePath) {
      // Si no hay archivo y se proporciona una URL
      createHabitacionDto.imagePath = createHabitacionDto.imagePath; // Usa la URL directamente
    } else {
      createHabitacionDto.imagePath = ''; // Si no hay imagen ni URL, asigna vacio
    }
    return this.habitacionesService.create(createHabitacionDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHabitacionDto: UpdateHabitacionDTO,
  ): Promise<Habitacion> {
    return this.habitacionesService.update(+id, updateHabitacionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.habitacionesService.remove(+id);
  }
}
