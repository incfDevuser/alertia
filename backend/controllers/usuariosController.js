import bcryptjs from "bcryptjs";
import Usuario from "../models/usuarioSchema.js";
import CreateJwt from "../utils/CreateJwt.js";

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
      return res.status(400).json({ message: "Usuario no tiene contraseña configurada" });
    }
    const validPassword = await bcryptjs.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = CreateJwt({ id: usuario._id });
    res.cookie("token_access", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ 
      message: "Login exitoso",
      usuario: {
        id: usuario._id,
        nombre_completo: usuario.nombre_completo,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message
    });
  }
};
const registrarse = async (req, res) => {
  const { nombre_completo, email, password, telefono, direccion, ubicacion } =
    req.body;
  if (!nombre_completo || !email || !password || !telefono || !direccion) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  try {
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
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
    const usuarioGuardado = await nuevoUsuario.save();
    const token = CreateJwt(usuarioGuardado);
    res.cookie("token_access", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: {
        nombre_completo: usuarioGuardado.nombre_completo,
        email: usuarioGuardado.email,
        rol: usuarioGuardado.rol,
      },
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
    const usuario = await Usuario.findById(req.user.id).select('-password');
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
      error: error.message
    });
  }
}
export const UsuarioController = {
  login,
  editarPerfil,
  perfilUsuario,
  registrarse,
  obtenerUsuarios,
  cerrarSesion,
};
