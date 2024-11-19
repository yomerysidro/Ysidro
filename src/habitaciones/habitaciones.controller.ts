import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
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
    if (file) {
      createHabitacionDto.imagePath = file.path;
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

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Habitacion> {
    if (!['Disponible', 'Reservado', 'Mantenimiento'].includes(status)) {
      throw new BadRequestException('Estado no válido');
    }
    return this.habitacionesService.updateStatus(+id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.habitacionesService.remove(+id);
  }
}
