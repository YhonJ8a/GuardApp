import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToOne
} from "typeorm";

import { Residente } from "./Residente";
import { Ingreso } from "./Ingresos";


@Entity("vehiculos")
export class Vehiculo extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false })
    placa!: string;

    @Column({ nullable: false })
    estado!: boolean;

    @Column({ nullable: false })
    cateforia!: string;

    @Column({ nullable: false })
    registro!: Date;

    @ManyToOne(() => Residente, residente => residente.vehiculos)
    residente!: Residente;

    @OneToOne(() => Ingreso, ingreso => ingreso.vehiculo)
    ingreso!: Ingreso;
}