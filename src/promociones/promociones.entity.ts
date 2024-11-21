import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'promociones' })
export class Promociones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 5, scale: 2 })
  descuento: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  image: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
