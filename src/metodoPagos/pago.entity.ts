// src/metodoPagos/pago.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })  // Estado del pago, con valor por defecto 'pending'
  status: string;

  @Column()
  paymentMethod: string; // Método de pago (e.g., 'Visa', 'Yape', 'Plin')

  @Column({ nullable: true })
  cardNumber?: string;

  @Column({ nullable: true })
  expirationMonth?: number;

  @Column({ nullable: true })
  expirationYear?: number;

  @Column({ nullable: true })
  cvv?: string;

  @Column()
  cardholderName: string;

}
