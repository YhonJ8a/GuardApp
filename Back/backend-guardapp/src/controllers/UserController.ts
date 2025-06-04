import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt";
import { validateEmail, validatePassword } from "./validatorController/validator";

const userRepository = AppDataSource.getRepository(Usuario);

export const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Fetching all users");
        const users = await userRepository.find({
            // where: { estado: "ACTIVO" },
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

// export const createUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { nombre, email, rol, password, perfil } = req.body;
//         if (!nombre || !email || !rol || !password || !perfil) {
//             res.status(400).json({ error: "Bad request, missing data" })
//             return;
//         }
//         const userBody = await Usuario.findOne({
//             where: { email: req.body.email }
//         })
//         if (!validateEmail(email)) {
//             res.status(400).json({ message: "Email is not valid" });
//             return;
//         }
//         if (!validatePassword(password)) {
//             res.status(400).json({ message: "Password is not valid" });
//             return;
//         }
//         const hashPassword = await bcrypt.hash(password, 10);
//         if (!userBody) {
//             const user = new Usuario()
//             user.nombre = nombre
//             user.email = email
//             user.password = hashPassword
//             user.perfil = perfil
//             user.rol = rol
//             const createUser = await userRepository.save(user);
//             res.status(201).json({ id: createUser.id });
//             return;
//         }
//         res.status(500).json({ message: "Ya existe un usuario con este correo" })
//         return;
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(500).json({ message: error.message })
//             return;
//         }
//     }
// }

// export const updateUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params
//         const { nombre, email, password, perfil, rol } = req.body;
//         const user = await await userRepository.findOne({
//             where: { id: id },
//             relations: ['rol', 'perfil']
//         });
//         if (!user) {
//             res.status(404).json({ message: "User not found" })
//             return;
//         }
//         if (!validatePassword) {
//             res.status(400).json({ message: "Password is not valid" })
//             return;
//         }
//         const hashPassword = await bcrypt.hash(password, 10);
//         user.nombre = nombre;
//         user.email = email;
//         user.password = hashPassword;
//         user.perfil = perfil;
//         user.rol = rol;

//         await user.save();
//         res.sendStatus(200);
//         return;
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(500).json({ message: error.message })
//             return;
//         }
//     }
// }

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