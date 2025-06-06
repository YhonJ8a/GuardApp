import { Request, Response } from "express";
import { AppDataSource } from "../db";

import { Vehiculo } from "../entities/Vehiculo";

const vehiRepository = AppDataSource.getRepository(Vehiculo);

export const allVehiculos = async (req: Request, res: Response): Promise<void> => {
    try {
        const vehiculo = await vehiRepository.find({where: { estado: true }});
        console.log("Vehiculos encontrados:", vehiculo.length);
        vehiculo.length ?
            res.json(vehiculo) :
            res.status(200).json({ message: "No se encontraron vehiculos" });

        return;
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        return;
    }
}

export const getVehiculo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const residente = await vehiRepository
            .findOne({ where: { id: id }});
        if (!residente) {
            res.status(404).json({ message: "Vehiculo no encontrado" });
            return;
        }
        res.json(residente);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}

export const getVehiculoPlaca = async (req: Request, res: Response): Promise<void> => {
    try {
        const { placa } = req.params;
        const residente = await vehiRepository
            .findOne({ where: { placa: placa }});
        if (!residente) {
            res.status(404).json({ message: "Vehiculo no encontrado" });
            return;
        }
        res.json(residente);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}