import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    JoinTable
} from "typeorm";

import { Vehiculo } from "./Vehiculo";
import { Ingreso } from "./Ingresos";


@Entity("residentes")
export class Residente extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({nullable: false})
    nombre!: string;
    
    @Column({nullable: false})
    apellido!: string;
    
    @Column({nullable: false})
    identificacion!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    estado: boolean = true;

    @Column()
    categoria!: string;
    
    @Column()
    registro!: Date;
    
    @OneToMany(() => Vehiculo, vehiculo => vehiculo.residente)
    @JoinTable()
    vehiculos!: Vehiculo[];
    
    @OneToMany(() => Ingreso, ingresos => ingresos.residente)
    @JoinTable()
    ingresos!: Ingreso[];
}
