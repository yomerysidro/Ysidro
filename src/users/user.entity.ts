import { hash } from "bcrypt";
import { DetalleReserva } from "src/detallesReservas/detalleReserva.entity";
import { Reserva } from "src/reservas/reserva.entity";
import { Rol } from "src/roles/rol.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'users' })
export class User {
  
  // Relación con reservas
  @ManyToMany(() => Reserva, reserva => reserva.users)
  reservas: Reserva[];

  // Relación con detalles de reserva
  @OneToMany(() => DetalleReserva, detalle => detalle.user)
  detalles: DetalleReserva[];
  

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ type: 'varchar' }) // Cambiado a tipo 'varchar'
  fechaNacimiento: string; 

  @Column({ unique: true })
  dni: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  notification_token: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  //personalizar la tabla pivote
  @JoinTable({
    name: 'user_has_roles',
    joinColumn: {
      name: 'id_user'
    },
    inverseJoinColumn: {
      name: 'id_rol'
    }
  })
  @ManyToMany(() => Rol, (rol) => rol.users)
  roles: Rol[];
 

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(process.env.HASH_SALT));
  }
 
  

}