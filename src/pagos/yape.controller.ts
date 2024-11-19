import { Controller, Post, Body } from '@nestjs/common';
import { YapeService } from './yape.service';

@Controller('yape')
export class YapeController {
  constructor(private readonly yapeService: YapeService) {}

  // Endpoint para obtener el token de Yape
  @Post('obtener_token_yape')
  async obtenerTokenYape(@Body() body: { phoneNumber: string, otp: string }) {
    const { phoneNumber, otp } = body;
    return await this.yapeService.obtenerTokenYape(phoneNumber, otp);
  }

  // Endpoint para crear el pago con el token de Yape
  @Post('crear_pago_yape')
  async crearPagoYape(@Body() body: { token: string, transactionAmount: number, email: string }) {
    const { token, transactionAmount, email } = body;
    return await this.yapeService.crearPagoYape(token, transactionAmount, email);
  }
}
