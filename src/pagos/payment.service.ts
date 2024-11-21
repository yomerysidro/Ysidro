import { Injectable } from '@nestjs/common';
import mercadopago from 'mercadopago';
import { getRepository } from 'typeorm';
import { Reserva } from 'src/reservas/reserva.entity';
import { Habitacion } from 'src/habitaciones/habitacion.entity';

@Injectable()
export class PagosService {
  constructor() {
    // Configura Mercado Pago con el token de acceso
 //   mercadopago.access_token = "APP_USR-3278543219849248-112113-b8058294bddbe314837b74b9d9908b05-2112043410";
  }

  async createPreference(data: any) {
    const { userId, habitacionId, startDate, endDate, notes } = data;

    if (!userId || !habitacionId || !startDate || !endDate) {
      throw new Error('Faltan datos obligatorios: userId, habitacionId, startDate o endDate.');
    }

    const habitacionRepository = getRepository(Habitacion);
    const habitacion = await habitacionRepository.findOne(habitacionId);

    if (!habitacion) {
      throw new Error('La habitación especificada no existe.');
    }
    if (habitacion.status === 'Reservado') {
      throw new Error('La habitación ya está reservada.');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const monto = duration * habitacion.price;

    const preferenceData = {
      items: [
        {
          title: `Reserva de habitación: ${habitacion.roomNumber}`,
          quantity: 1,
          unit_price: monto,
          currency_id: 'PEN',
        },
      ],
      back_urls: {
        success: '',
        failure: '',
        pending: '',
      },
      auto_return: 'approved',
      additional_info: `Reserva desde ${startDate} hasta ${endDate}`,
    };

    const preferenceResponse = await mercadopago.preferences.create(preferenceData);
    if (preferenceResponse.status !== 201) {
      throw new Error(`Error al crear la preferencia: ${preferenceResponse}`);
    }

    const reservaRepository = getRepository(Reserva);
    const nuevaReserva = reservaRepository.create({
      startDate,
      endDate,
      duration: `${duration} días`,
      notes: notes || '',
      user: { id: userId },
      habitacion,
      pago: null,
    });

    await reservaRepository.save(nuevaReserva);

    habitacion.status = 'Reservado';
    await habitacionRepository.save(habitacion);

    return {
      id: preferenceResponse.body.id,
      init_point: preferenceResponse.body.init_point,
      total: monto,
      reservaId: nuevaReserva.id,
    };
  }
}
