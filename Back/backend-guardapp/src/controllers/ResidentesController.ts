import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Residente } from "../entities/Residente";
import { Vehiculo } from "../entities/Vehiculo";

const resiRepository = AppDataSource.getRepository(Residente);

export const allResidentes = async (req: Request, res: Response): Promise<void> => {
    try {
        const residentes = await resiRepository.find({
            where: { estado: true },
        });

        residentes.length ?
            res.json(residentes) :
            res.status(200).json({ message: "No se encontraron residentes" });

        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
        return;
    }
}

export const allResidentesInactive = async (req: Request, res: Response): Promise<void> => {
    try {
        const residentes = await resiRepository.find({
            where: { estado: false }
        });

        residentes.length ?
            res.json(residentes) :
            res.status(200).json({ message: "No se encontraron residentes" });

        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
        return;
    }
}

export const getResidenteCc = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cc } = req.params;
        const residentes = await resiRepository.findOne({
            where: { identificacion: cc }
        });

        residentes ?
            res.json(residentes) :
            res.status(200).json({ message: "No se encontraron residentes con esa cc" });

        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
        return;
    }
}

export const getResidente = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const residente = await resiRepository
            .findOne({ where: { id: id } });
        if (!residente) {
            res.status(404).json({ message: "Residente no encontrado" });
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

export const getResidenteVehiculos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const residente = await resiRepository
            .findOne({ where: { id: id }, relations: ['vehiculos'] });
        if (!residente) {
            res.status(404).json({ message: "Residente no encontrado" });
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

export const getResidenteIngresos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const residente = await resiRepository
            .findOne({ where: { id: id }, relations: ['ingresos'] });
        if (!residente) {
            res.status(404).json({ message: "Residente no encontrado" });
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

export const createResidente = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, apellido, identificacion, email, categoria } = req.body;

        const newResidente = resiRepository.create({
            nombre,
            apellido,
            identificacion,
            email,
            categoria,
            registro: new Date(),
            estado: true
        });

        const savedResidente = await resiRepository.save(newResidente);
        res.status(201).json(savedResidente);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const createVehiculoResidente = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { placa, cateforia } = req.body;

        const residente = await resiRepository.findOne({ where: { id: id } });
        if (!residente) {
            res.status(404).json({ message: "Residente no encontrado" });
            return;
        }
        const newVehiculo = AppDataSource.getRepository(Vehiculo).create({
            placa,
            cateforia,
            registro: new Date(),
            estado: true,
            residente: residente
        });
        await AppDataSource.getRepository(Vehiculo).save(newVehiculo);
        const residenteFin = await resiRepository.findOne({ where: { id: id }, relations: ['vehiculos'] });
        res.status(201).json(residenteFin);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const updateResidente = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre, apellido, identificacion, email, categoria } = req.body;

        const residente = await resiRepository.findOne({ where: { id } });
        if (!residente) {
            res.status(404).json({ message: "Residente no encontrado" });
            return;
        }

        residente.nombre = nombre;
        residente.apellido = apellido;
        residente.identificacion = identificacion;
        residente.email = email;
        residente.categoria = categoria;

        const updatedResidente = await resiRepository.save(residente);
        res.json(updatedResidente);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const deleteResidente = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const residente = await resiRepository.findOne({ where: { id } });
        if (!residente) {
            res.status(404).json({ message: "Residente no encontrado" });
            return;
        }
        residente.estado = false;
        const updatedResidente = await resiRepository.save(residente);
        res.json(updatedResidente);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}