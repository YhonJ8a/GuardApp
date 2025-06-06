import { Router } from "express";

import {
    allResidentes,
    allResidentesInactive,
    getResidente,
    getResidenteVehiculos,
    getResidenteIngresos,
    createResidente,
    createVehiculoResidente,
    updateResidente,
    deleteResidente,
    getResidenteCc
} from "../../controllers/ResidentesController";


const router = Router()

router.get("/", allResidentes);

router.get("/inactive", allResidentesInactive);

router.get("/cc/:cc", getResidenteCc);

router.get("/:id", getResidente);

router.get("/:id/vehiculos", getResidenteVehiculos);

router.get("/:id/ingresos", getResidenteIngresos);

router.post("/", createResidente);

router.post("/:id/new-vehiculo", createVehiculoResidente);

router.put("/:id", updateResidente);

router.delete("/:id", deleteResidente);


export default router;