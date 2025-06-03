import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToOne
} from "typeorm";

import { Residente } from "./Residente";
import { Vehiculo } from "./Vehiculo";
import { Usuario } from "./Usuario";

@Entity("usuarios")
export class Ingreso extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Residente, residente => residente.ingresos)
    residente!: Residente;

    @OneToOne(() => Vehiculo, vehiculo => vehiculo.ingreso)
    vehiculo!: Vehiculo;

    @Column({ nullable: false })
    fecha_ingreso!: Date;

    @Column({ nullable: false })
    accion!: string;

    @ManyToOne(() => Usuario, usuario => usuario.ingreso)
    usuario!: Usuario;

    @Column({ unique: true })
    email!: string;

    @Column()
    estado!: string;

    @Column()
    admin: boolean = false;

    @Column({ select: false })
    password!: string;
}