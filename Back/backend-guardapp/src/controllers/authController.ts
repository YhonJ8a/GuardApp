import { Request, Response, NextFunction } from "express";
import { validateEmail, validatePassword } from "./validatorController/validator";
import { AppDataSource } from "../db"
import dotenv from "dotenv";

import jwt from 'jsonwebtoken';
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "CALL_ME_SECRETsupersecreta1475675";
const EXPIRES_IN = Number(process.env.EXPIRES_IN) || 3600;
const userRepository = AppDataSource.getRepository(Usuario);

export const loginHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!validateEmail(email)) {
            res.status(400).json({ message: "Email is not valid" });
            return;
        }
        if (!validatePassword(password)) {
            res.status(400).json({ message: "Password is not valid" });
            return;
        }

        const user = await userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where("user.email = :email", { email: email })
            .getOne();

        if (!user || !user.password) {
            res.status(400).json({ message: "user not found" });
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) { res.status(400).json({ message: "password not valid" }) };

        const token = jwt.sign({ id: user.id, email: user.email, admin: user.admin }, SECRET_KEY, { expiresIn: EXPIRES_IN });

        res.json({ token, user });
        return


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
        return;
    }
};


export const signUpHandler = async (req: Request, res: Response): Promise<void> => {
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
        console.log(user);
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