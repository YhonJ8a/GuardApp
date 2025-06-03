import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
} from "typeorm";
import { Ingreso } from "./Ingresos";


@Entity("usuarios")
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false })
    nombre!: string;

    @Column({ nullable: false })
    apellido!: string;

    @Column({ nullable: false })
    identificacion!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    estado!: string;

    @Column()
    telefono!: string;

    @Column()
    admin: boolean = false;

    @Column({ select: false })
    password!: string;

    @OneToMany(() => Ingreso, ingreso => ingreso.usuario)
    ingreso!: Ingreso;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha_ingreso!: Date;
}
