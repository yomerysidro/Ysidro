import { Controller, Post, Body } from '@nestjs/common';
import { YapeService } from './yape.service';
import { CrearPagoYapeDto } from './bloc/crear-pago-yape.dto';
import { ObtenerTokenYapeDto } from './bloc/obtener-token-yape.dto';
@Controller('yape')
export class YapeController {
  constructor(private readonly yapeService: YapeService) {}

  // Endpoint para obtener el token de Yape
  @Post('obtener-token')
  async obtenerTokenYape(@Body() obtenerTokenDto: ObtenerTokenYapeDto) {
    const { phoneNumber, otp } = obtenerTokenDto;
    return await this.yapeService.obtenerTokenYape(phoneNumber, otp);
  }

  // Endpoint para crear un pago con Yape
  @Post('crear-pago')
  async crearPagoYape(@Body() crearPagoDto: CrearPagoYapeDto) {
    const { token, transactionAmount, email } = crearPagoDto;
    return await this.yapeService.crearPagoYape(token, transactionAmount, email);
  }
}
