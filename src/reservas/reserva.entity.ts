import { User } from 'src/users/user.entity';
import { Habitacion } from 'src/habitaciones/habitacion.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
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



  // Relación con usuarios (cada reserva pertenece a un único usuario)
  @ManyToOne(() => User, user => user.reservas, { eager: true })
  user: User;

  // Relación con habitaciones
  @ManyToOne(() => Habitacion, habitacion => habitacion.id, { eager: true })
  habitacion: Habitacion;

  // Relación con pagos
  @ManyToOne(() => Pago, pago => pago.id, { eager: true })
  pago: Pago;
}
