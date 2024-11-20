import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MercadoPagoService } from './mercado_pago.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { PaymentBody } from './models/payment_body';

@Controller('mercadopago')
export class MercadoPagoController {
    constructor(private mercadoPagoService: MercadoPagoService) {}

    @HasRoles(JwtRole.ADMIN, JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post('payments')
    async createPayment(@Body() paymentBody: PaymentBody) {
        return await this.mercadoPagoService.createPayment(paymentBody);
    }
}
