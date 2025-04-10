import { Router } from "express";
import { AlertasController } from "../controllers/alertasController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
const router = Router();

//Obtener alertas
router.get("/", AlertasController.obtenerAlertas);
//Crear una alerta
router.post("/crear", AuthMiddleware.AuthToken, AlertasController.crearAlerta);
//Obtener alertas por comuna

export default router;
