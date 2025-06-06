import { Router } from "express";

import {
    allIngresos,
    createIngreso
} from "../../controllers/IngresoController";


const router = Router()

router.get("/", allIngresos);

router.post("/", createIngreso);

export default router;