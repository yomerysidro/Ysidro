import { DetalleReserva } from 'src/detallesReservas/detalleReserva.entity';
import { User } from 'src/users/user.entity';
import { Habitacion } from 'src/habitaciones/habitacion.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { Pago } from 'src/metodoPagos/pago.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  notes: string;

  // Relación con detalles de reserva
  @OneToMany(() => DetalleReserva, detalle => detalle.reserva)
  detalles: DetalleReserva[];

  // Relación con usuarios
  @ManyToMany(() => User, user => user.reservas)
  users: User[];

  // Relación con habitaciones
  @ManyToOne(() => Habitacion, habitacion => habitacion.id, { eager: true })
  habitacion: Habitacion;

  // Relación con pagos
  @ManyToOne(() => Pago, pago => pago.id, { eager: true })
  pago: Pago;
}
