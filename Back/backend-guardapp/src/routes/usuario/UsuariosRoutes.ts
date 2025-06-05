import { Router } from "express";

import {
    allUsers,
    getUser,
    getUserIngresos,
    createUser,
    updateUser
} from "../../controllers/UserController"; 


const router = Router()

router.get("/", allUsers);

router.get("/:id", getUser);

router.get("/:id/ingresos", getUserIngresos);

router.post("/", createUser);

router.put("/:id", updateUser);

// router.get("/pedidos/:id", getUserPedidos);

// router.get("/ventas/:id", getUserVentas);

export default router;
