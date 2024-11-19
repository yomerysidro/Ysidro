import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  paymentMethod: string;

  @Column({ nullable: true })
  token?: string;

  @Column()
  email: string;
}
