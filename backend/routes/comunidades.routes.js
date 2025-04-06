import { Router } from "express";
import { ComunidadesController } from "../controllers/comunidadesController.js";
const router = Router();

//Obtener todas las comunidades
router.get("/", ComunidadesController.obtenerComunidades);

export default router;
