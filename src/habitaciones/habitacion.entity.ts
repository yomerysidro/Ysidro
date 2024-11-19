import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomNumber: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  imagePath?: string;

  @Column({
    type: 'enum',
    enum: ['Disponible', 'Reservado'], // Define los valores permitidos para el estado
    default: 'Disponible', // Valor por defecto
  })
  status: string; // Estado de la habitación
}
