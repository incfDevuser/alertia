import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import conexion from "./config/db.js";
//Rutas de usuarios
import usuarioRoutes from "./routes/usuario.routes.js";
dotenv.config();
conexion();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//API de usuarios
app.use("/api/usuarios", usuarioRoutes); 
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
