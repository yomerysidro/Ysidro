import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: string;

  @Column()
  status: string;

  @Column()
  amount: number;
}
