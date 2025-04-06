import Comunidad from "../models/comunidadesSchema.js";

const obtenerComunidades = async (req, res) => {
  try {
    const comunidades = await Comunidad.find().populate(
      "admin_comunidad",
      "nombre_usuario"
    );
    return res.status(200).json({
      message: "Lista de comunidades",
      comunidades,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener comunidades",
      error: error.message,
    });
  }
};
const crearComunidades = async (req, res) => {
  try {
  } catch (error) {}
};
const eliminarComunidad = async (req, res) => {
  try {
  } catch (error) {}
};
const editarComunidad = async (req, res) => {
  try {
  } catch (error) {}
};

export const ComunidadesController = {
  obtenerComunidades,
  crearComunidades,
  eliminarComunidad,
  editarComunidad,
};
