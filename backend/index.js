import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import conexion from "./config/db.js";
dotenv.config();
conexion();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
