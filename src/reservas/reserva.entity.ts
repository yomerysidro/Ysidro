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

  @ManyToOne(() => User, (user) => user.reservas, { eager: true, nullable: false })
  user: User;

  @ManyToOne(() => Habitacion, (habitacion) => habitacion.id, { eager: true, nullable: false })
  habitacion: Habitacion;

  @ManyToOne(() => Pago, (pago) => pago.id, { eager: true, nullable: true })
  pago: Pago;
  
}
