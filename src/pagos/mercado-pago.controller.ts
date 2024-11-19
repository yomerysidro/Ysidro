import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  // Endpoint para obtener el token de Yape
  
  @Post('obtener-token-yape')
  async obtenerTokenYape(@Body() body: { phoneNumber: string; otp: string }) {
    const { phoneNumber, otp } = body;
    return await this.mercadoPagoService.obtenerTokenYape(phoneNumber, otp);
  }

  // Endpoint para crear el pago con Yape
  
  @Post('crear-pago-yape')
  async crearPagoYape(@Body() body: { token: string; transactionAmount: number; email: string }) {
    const { token, transactionAmount, email } = body;
    return await this.mercadoPagoService.crearPagoYape(token, transactionAmount, email);
  }
}
