import { hash } from "bcrypt";
import { Reserva } from "src/reservas/reserva.entity";
import { Rol } from "src/roles/rol.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: 'users' })
export class User {
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

  @Column({ type: 'varchar' })
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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Relación con reservas: un usuario puede tener varias reservas (cambiado a @OneToMany)
  @OneToMany(() => Reserva, reserva => reserva.user)
  reservas: Reserva[];

 
  // Relación con roles mediante tabla pivote personalizada
  @ManyToMany(() => Rol, rol => rol.users)
  @JoinTable({
    name: 'user_has_roles',
    joinColumn: {
      name: 'id_user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_rol',
      referencedColumnName: 'id',
    },
  })
  roles: Rol[];

  // Encriptar la contraseña antes de insertar el usuario
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(process.env.HASH_SALT));
  }
}
