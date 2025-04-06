import bcryptjs from "bcryptjs";
import Usuario from "../models/usuarioSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los usuarios",
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (!usuario.password) {
      return res
        .status(400)
        .json({ message: "Usuario no tiene contraseña configurada" });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const payload = {
      _id: usuario._id,
      nombre_completo: usuario.nombre_completo,
      email: usuario.email,
      rol: usuario.rol,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: true,
    };
    res.cookie("token_access", token, cookieOptions);
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: payload,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};
const registrarse = async (req, res) => {
  const { nombre_completo, email, password, telefono, direccion, ubicacion } =
    req.body;
  if (!nombre_completo || !email || !password || !telefono || !direccion) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  const usuarioExiste = await Usuario.findOne({ email });
  if (usuarioExiste) {
    return res.status(400).json({ message: "El email ya está registrado" });
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const nuevoUsuario = new Usuario({
    nombre_completo,
    email,
    password: hashedPassword,
    telefono,
    direccion,
    ubicacion: ubicacion || {
      type: "Point",
      coordinates: [0, 0],
    },
    rol: "usuario",
  });
  try {
    const nuevoUsuario = await nuevoUsuario.save();
    const payload = {
      _id: nuevoUsuario._id,
      nombre_completo: nuevoUsuario.nombre_completo,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: true,
    };
    res.cookie("token_access", token, cookieOptions);
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      nuevoUsuario,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    return res.status(500).json({
      message: "Error al registrar el usuario",
      error: error.message,
    });
  }
};
const editarPerfil = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Error al editar el perfil",
    });
  }
};
const cerrarSesion = async (req, res) => {
  res
    .clearCookie("token_access", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({
      message: "Usuario deslogeado",
    });
};
const perfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user._id).select("-password");
    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al obtener el perfil",
      error: error.message,
    });
  }
};
export const UsuarioController = {
  login,
  editarPerfil,
  perfilUsuario,
  registrarse,
  obtenerUsuarios,
  cerrarSesion,
};
