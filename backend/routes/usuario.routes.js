import { Router } from "express";
const router = Router();
import { UsuarioController } from "../controllers/usuariosController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

router.get("/", AuthMiddleware.AuthToken,UsuarioController.obtenerUsuarios);
router.post("/login", UsuarioController.login);
router.post("/registrarse", UsuarioController.registrarse);
router.put(
  "/editar-perfil",
  AuthMiddleware.AuthToken,
  UsuarioController.editarPerfil
);
router.get("/perfil-usuario", AuthMiddleware.AuthToken, UsuarioController.perfilUsuario);
router.post("/cerrar-sesion", UsuarioController.cerrarSesion);
export default router;
