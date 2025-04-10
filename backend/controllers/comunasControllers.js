import Comuna from "../models/comunasSchema.js";
import Alerta from "../models/alertasSchema.js";
import * as turf from "@turf/turf";

const obtenerComunas = async (req, res) => {
  try {
    const comunas = await Comuna.find().populate("comunidades");
    res.json(comunas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener comunas", error: error.message });
  }
};
const obtenerComunidadesComuna = async (req, res) => {
  try {
    const { comunaId } = req.params;
    const comuna = await Comuna.findById(comunaId).populate("comunidades");

    if (!comuna) {
      return res.status(404).json({ mensaje: "Comuna no encontrada" });
    }

    res.status(200).json({
      message: "Comunidades en la comuna",
      comunidades: comuna.comunidades,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener comunidades de la comuna",
      error: error.message,
    });
  }
};
const obtenerAlertasEnComuna = async (req, res) => {
  try {
    const { comunaId } = req.params;
    const comuna = await Comuna.findById(comunaId);
    if (!comuna) {
      return res.status(404).json({ mensaje: "Comuna no encontrada" });
    }
    const alertas = await Alerta.find({
      ubicacion: {
        $geoWithin: {
          $geometry: comuna.zona,
        },
      },
    }).populate("creada_por");
    res.status(200).json({
      message: "Alertas en la comuna",
      alertas,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener alertas en la comuna",
      error: error.message,
    });
  }
};
const crearComuna = async (req, res) => {
  try {
    const { nombre_comuna, coordinates } = req.body;
    
    // Validar que el polígono sea válido usando Turf
    const polygon = turf.polygon([coordinates]);
    if (!turf.booleanValid(polygon)) {
      return res.status(400).json({ mensaje: "Geometría del polígono inválida" });
    }

    const nuevaComuna = new Comuna({
      nombre_comuna,
      zona: {
        type: "Polygon",
        coordinates: [coordinates],
      },
    });
    await nuevaComuna.save();
    res.status(201).json(nuevaComuna);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear comuna", error: error.message });
  }
};
export const ComunasController = {
  obtenerComunas,
  obtenerComunidadesComuna,
  obtenerAlertasEnComuna,
  crearComuna,
};
