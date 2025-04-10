import { Router } from "express";
import { ComunidadesController } from "../controllers/comunidadesController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
const router = Router();

//Obtener todas las comunidades
router.get("/", ComunidadesController.obtenerComunidades);
//Crear una comunidad
router.post(
  "/crear",
  AuthMiddleware.AuthToken,
  ComunidadesController.crearComunidades
);
//Unirse a una comunidad
router.post(
  "/unirse",
  AuthMiddleware.AuthToken,
  ComunidadesController.unirseComunidad
);
//Salir de una comunidad
router.post(
  "/salir/:comunidadId",
  AuthMiddleware.AuthToken,
  ComunidadesController.salirDeComunidad
);
//Obtener comunidades del usuario
router.get(
  "/mis-comunidades",
  AuthMiddleware.AuthToken,
  ComunidadesController.obtenerComunidadesPorUsuario
);
//Obtener alertas por comunidad
router.get(
  "/alertas/:comunidadId",
  AuthMiddleware.AuthToken,
  ComunidadesController.obtenerAlertasComunidad
);

export default router;
