import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PagosService } from './payment.service';

@Controller('pagos') // Agrega el prefijo '/pagos' a todas las rutas del controlador
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('create') // Ruta '/pagos/create_preference'
  async createPreference(@Body() data: any, @Res() res: Response) {
    try {
      const result = await this.pagosService.createPreference(data);
      return res.json(result); // Responde con el resultado del servicio
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      throw new HttpException(
        { message: 'Error al crear la preferencia', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
