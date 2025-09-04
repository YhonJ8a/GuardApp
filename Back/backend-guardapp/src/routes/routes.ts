import { Router } from "express";

import { loginHandler, signUpHandler } from "../controllers/authController";
import { requireAuth } from "../middleware/requireAuth";
import Usuario from "../routes/usuario/UsuariosRoutes";
import Residente from "../routes/residentes/ResidenteRoutes";
import Vehiculo from "../routes/vehiculos/vehiculosRoutes";
import Ingreso from "../routes/ingresos/ingresoRoutes";


const router = Router()

router.post('/login', loginHandler);

router.post('/signup', signUpHandler);

router.use("/users", requireAuth, Usuario);

router.use("/residentes", requireAuth, Residente);

router.use("/vehiculo", requireAuth, Vehiculo);

router.use("/ingreso", requireAuth, Ingreso);

export default router;
