import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Ingreso } from "../entities/Ingresos";
import { Residente } from "../entities/Residente";
import { Vehiculo } from "../entities/Vehiculo";
import { Usuario } from "../entities/Usuario";

const ingresoRepository = AppDataSource.getRepository(Ingreso);
const resiRepository = AppDataSource.getRepository(Residente);
const vehiRepository = AppDataSource.getRepository(Vehiculo);
const usuarioRepository = AppDataSource.getRepository(Usuario);

export const allIngresos = async (req: Request, res: Response): Promise<void> => {
    try {
        const ingresos = await ingresoRepository.find();

        ingresos.length ?
            res.json(ingresos) :
            res.status(200).json({ message: "No se encontraron ingresos" });

        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
        return;
    }
}

export const createIngreso = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cc, placa, actionuser } = req.body;

        const residente = await resiRepository.findOne({
            where: { identificacion: cc }
        });
        if (!residente) {
            res.status(404).json({ message: "Residente no encontrado" });
            return;
        }

        const usuario = await usuarioRepository
            .findOne({ where: { email: actionuser.email } });

        if (!usuario) {
            res.status(404).json({ message: "Residente no encontrado" });
            return;
        }

        let vehiculo = await vehiRepository.findOne({ where: { placa: placa } });

        const newIngreso = ingresoRepository.create({
            residente,
            usuario,
            accion: "INGRESO",
            fecha_ingreso: new Date()
        });


        // if (vehiculo) {
        //     newIngreso.vehiculo = vehiculo;
        // }

        const savedIngreso = await ingresoRepository.save(newIngreso);
        res.status(201).json(savedIngreso);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}