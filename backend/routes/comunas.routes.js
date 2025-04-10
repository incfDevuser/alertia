import { Router } from "express";
import { ComunasController } from "../controllers/comunasControllers.js";

const router = Router();

// Rutas para comunas
router.get("/", ComunasController.obtenerComunas);
router.get(
  "/:comunaId/comunidades",
  ComunasController.obtenerComunidadesComuna
);
router.get("/:comunaId/alertas", ComunasController.obtenerAlertasEnComuna);
router.post("/crear", ComunasController.crearComuna);

export default router;
