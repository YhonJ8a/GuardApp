import { Router } from "express";

import {
    allVehiculos,
    getVehiculo,
    getVehiculoPlaca,
} from "../../controllers/VehiculoController";


const router = Router()

router.get("/", allVehiculos);

router.get("/:id", getVehiculo);

router.get("/placa/:placa", getVehiculoPlaca);

export default router;