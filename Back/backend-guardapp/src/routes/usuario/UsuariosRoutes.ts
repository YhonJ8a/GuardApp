import { Router } from "express";

import { allUsers, getUser } from "../../controllers/UserController"; //, createUser, updateUser, getUserPedidos, getUserVentas


const router = Router()

router.get("/", allUsers);

router.get("/:id", getUser);

// router.post("/", createUser);

// router.put("/:id", updateUser);

// router.get("/pedidos/:id", getUserPedidos);

// router.get("/ventas/:id", getUserVentas);

export default router;
