import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePromocionesDTO } from './bloc/create-promociones.dto';
import { UpdatePromocionesDTO } from './bloc/uodate-promociones.dto';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';

@Controller('promociones')
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  // Ruta para obtener todas las promociones
  @Get()
  findAll() {
    return this.promocionesService.findAll();
  }

  // Ruta para crear una nueva promoción con imagen
  //@HasRoles(JwtRole.ADMIN)
  //@UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createWithImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // Máximo 10MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), // Solo imágenes
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createPromocionDto: CreatePromocionesDTO,
  ) {
    return this.promocionesService.create(file, createPromocionDto);
  }

  // Ruta para actualizar una promoción
  //@HasRoles(JwtRole.ADMIN)
 // @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePromocionDto: UpdatePromocionesDTO,
  ) {
    return this.promocionesService.update(id, updatePromocionDto);
  }

  // Ruta para actualizar una promoción con imagen
  //@HasRoles(JwtRole.ADMIN)
  //@UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Put('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateWithImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // Máximo 10MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), // Solo imágenes
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePromocionDto: UpdatePromocionesDTO,
  ) {
    return this.promocionesService.updateWithImage(file, id, updatePromocionDto);
  }

  // Ruta para eliminar una promoción
  @HasRoles(JwtRole.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.promocionesService.delete(id);
  }
}
