import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import { Usuario } from "../entities/Usuario";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret";

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ message: "Require Auth" });
            return;
        }

        const token = authHeader.split(' ')[1];
        console.log("TOKEN ", token);
        if (!token) {
            res.status(401).json({ message: "Invalid AccessToken" });
            return;
        }
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            req.body = {...req.body, actionuser: user};
            next()
        })
    } catch (error) {
        next(error);
    }
}