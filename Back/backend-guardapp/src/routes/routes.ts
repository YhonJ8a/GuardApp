import { Router } from "express";

import { loginHandler, signUpHandler } from "../controllers/authController";
// import { requireAuth } from "../middleware/requireAuth";
// import Usuario from "../routes/usuario/UsuariosRoutes";
// import Producto from "../routes/producto/ProductoRoutes";
// import { allProducts } from "../controllers/ProductoController";

const router = Router()

router.post('/login', loginHandler);
router.post('/signup', signUpHandler);
// router.get("/productos", allProducts);

// router.use("/users", requireAuth, Usuario);

// router.use("/producto",requireAuth, Producto);


export default router;
