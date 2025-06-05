import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt";
import { validateEmail, validatePassword } from "./validatorController/validator";

const userRepository = AppDataSource.getRepository(Usuario);

export const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepository.find({
            where: { estado: "ACTIVO" },
            relations: ['ingreso']
        });

        users.length ?
            res.json(users) :
            res.status(200).json({ message: "No se encontraron usuarios" });

        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
        return;
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await userRepository
            .findOne({ where: { id: id } })
        res.json(user);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}

export const getUserIngresos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await userRepository
            .findOne({
                where: { id: id },
                relations: ['ingreso']
            })
        res.json(user);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, email, password, telefono, identificacion, apellido } = req.body;
        if (!nombre || !email || !password || !telefono || !identificacion || !apellido) {
            res.status(400).json({ error: "Bad request, missing data" });
            return;
        }
        const userBody = await Usuario.findOne({ where: { email: req.body.email } });

        if (userBody) {
            res.status(500).json({ message: "Ya existe un usuario con este correo" })
            return;
        }
        if (!validateEmail(email)) {
            res.status(400).json({ message: "Email is not valid" });
            return;
        }
        if (!validatePassword(password)) {
            res.status(400).json({ message: "Password is not valid" });
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new Usuario();
        user.nombre = nombre;
        user.apellido = apellido;
        user.email = email;
        user.password = hashPassword;
        user.estado = "ACTIVO";
        user.telefono = telefono;
        user.admin = false;
        user.identificacion = identificacion;
        const createUser = await userRepository.save(user);
        res.status(201).json({ id: createUser.id });

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
            return;
        }
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { nombre, email, apellido, telefono, identificacion } = req.body;

        const user = await userRepository.findOne({
            where: { id: id }
        });
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return;
        }
        user.nombre = nombre || user.nombre;
        user.apellido = apellido || user.apellido;
        user.email = email || user.email;
        user.telefono = telefono || user.telefono;
        user.identificacion = identificacion || user.identificacion;

        await user.save();
        res.sendStatus(200);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
            return;
        }
    }
}

// export const getUserPedidos = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const user = await userRepository.findOne({
//             where: { id: id },
//             relations: ['pedidoPorUsuario.pedido.productos']
//         },)
//         res.json(user);
//         return;
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(500).json({ message: error.message });
//             return;
//         }
//     }
// }

// export const getUserVentas = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const user = await userRepository.findOne({
//             where: { id: id },
//             relations: ['ventas.pedido.productos']
//         },)
//         res.json(user);
//         return;
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(500).json({ message: error.message });
//             return;
//         }
//     }
// }