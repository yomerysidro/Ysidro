import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reserva } from '../reservas/reserva.entity';
import { User } from '../users/user.entity';
import { Pago } from 'src/metodoPagos/pago.entity';

@Entity()
export class DetalleReserva {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Reserva, reserva => reserva.detalles, { eager: true })
    reserva: Reserva;

    @ManyToOne(() => User, user => user.detalles, { eager: true })
    user: User;

    @ManyToOne(() => Pago, pago => pago.detalles, { eager: true }) // Asegúrate de que esta relación sea correcta
    pago: Pago;




    // Otros campos de detalles de reserva que necesites...
}
