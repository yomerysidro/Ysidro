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

  @Column({ default: 'Disponible' }) // Estado por defecto es 'disponible'
  status: string; // Estado de la habitación (disponible u ocupado)
}
