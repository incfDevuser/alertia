import Comunidad from "../models/comunidadesSchema.js";
import { generarCodigoAcceso } from "../utils/CodigoAcceso.js";

const obtenerComunidades = async (req, res) => {
  try {
    const comunidades = await Comunidad.find()
      .select("-codigo_acceso")
      .populate({
        path: "miembros.usuario",
        select: "nombre_completo rol",
      })
      .populate("admin_comunidad", "nombre_completo rol");
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
  const user_id = req.user._id;
  try {
    const { nombre_comunidad, color_comunidad, zona } = req.body;
    if (!nombre_comunidad || !color_comunidad || !zona?.coordinates) {
      return res.status(400).json({
        message: "Todos los campos son requeridos",
      });
    }
    const coordinates = zona.coordinates[0];
    if (!Array.isArray(coordinates) || coordinates.length < 4) {
      return res.status(400).json({
        message: "El polígono debe tener al menos 3 puntos diferentes",
      });
    }
    if (
      JSON.stringify(coordinates[0]) !==
      JSON.stringify(coordinates[coordinates.length - 1])
    ) {
      coordinates.push([...coordinates[0]]);
    }
    const nuevaComunidad = new Comunidad({
      nombre_comunidad,
      color_comunidad,
      zona: {
        type: "Polygon",
        coordinates: [coordinates],
      },
      codigo_acceso: generarCodigoAcceso(),
      admin_comunidad: user_id,
      miembros: [{ usuario: user_id }],
    });
    const comunidadGuardada = await nuevaComunidad.save();
    return res.status(201).json({
      message: "Comunidad creada exitosamente",
      comunidad: comunidadGuardada,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la comunidad",
      error: error.message,
    });
  }
};
const unirseComunidad = async (req, res) => {
  const { codigo_acceso } = req.body;
  const user_id = req.user._id;
  try {
    if (!codigo_acceso) {
      return res.status(400).json({
        message: "El código de acceso es requerido",
      });
    }
    const comunidad = await Comunidad.findOne({ codigo_acceso });
    if (!comunidad) {
      return res.status(404).json({
        message: "Comunidad no encontrada",
      });
    }
    if (comunidad.miembros.some((m) => m.usuario.equals(user_id))) {
      return res
        .status(400)
        .json({ message: "Ya eres miembro de esta comunidad" });
    }
    comunidad.miembros.push({ usuario: user_id });
    await comunidad.save();

    const comunidadActualizada = await Comunidad.findById(comunidad._id)
      .select("-codigo_acceso")
      .populate({
        path: "miembros.usuario",
        select: "nombre_completo rol",
      })
      .populate("admin_comunidad", "nombre_completo rol");

    return res.status(200).json({
      message: "Te has unido a la comunidad exitosamente",
      comunidad: comunidadActualizada,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al unirse a la comunidad",
      error: error.message,
    });
  }
};
const salirDeComunidad = async (req, res) => {
  const user_id = req.user._id;
  const { comunidadId } = req.params;
  try {
    const comunidad = await Comunidad.findById(comunidadId);

    if (!comunidad) {
      return res.status(404).json({
        message: "Comunidad no encontrada",
      });
    }
    if (comunidad.admin_comunidad.equals(user_id)) {
      return res.status(400).json({
        message: "El administrador no puede salir de la comunidad",
      });
    }
    if (!comunidad.miembros.some((m) => m.usuario.equals(user_id))) {
      return res.status(400).json({
        message: "No eres miembro de esta comunidad",
      });
    }
    comunidad.miembros = comunidad.miembros.filter(
      (m) => !m.usuario.equals(user_id)
    );
    await comunidad.save();
    return res.status(200).json({
      message: "Has salido de la comunidad exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al salir de la comunidad",
      error: error.message,
    });
  }
};
const obtenerComunidadesPorUsuario = async (req, res) => {
  const user_id = req.user._id;
  try {
    const comunidades = await Comunidad.find({
      "miembros.usuario": user_id,
    })
      .populate({
        path: "miembros.usuario",
        select: "nombre_completo rol",
      })
      .populate("admin_comunidad", "nombre_completo rol")
      .populate({
        path: "alertas",
        select: "tipo_alerta ubicacion descripcion fecha_creacion estado creada_por",
        populate: {
          path: "creada_por",
          select: "nombre_completo"
        }
      })
      .populate({
        path: "alertas_cercanas",
        select: "tipo_alerta ubicacion descripcion fecha_creacion estado creada_por",
        populate: {
          path: "creada_por",
          select: "nombre_completo"
        }
      });
    return res.status(200).json({
      message: "Comunidades del usuario obtenidas exitosamente",
      comunidades,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las comunidades del usuario",
      error: error.message,
    });
  }
};
const obtenerAlertasComunidad = async (req, res) => {
  try {
    const { comunidadId } = req.params;

    const comunidad = await Comunidad.findById(comunidadId)
      .populate({
        path: "alertas",
        select:
          "tipo_alerta ubicacion fecha_creacion descripcion estado creada_por",
        populate: {
          path: "creada_por",
          select: "nombre_completo",
        },
      })
      .populate({
        path: "alertas_cercanas",
        select:
          "tipo_alerta ubicacion fecha_creacion descripcion estado creada_por",
        populate: {
          path: "creada_por",
          select: "nombre_completo",
        },
      });

    if (!comunidad) {
      return res.status(404).json({
        message: "Comunidad no encontrada",
      });
    }

    return res.status(200).json({
      message: "Alertas obtenidas exitosamente",
      data: {
        alertas_dentro: comunidad.alertas,
        alertas_cercanas: comunidad.alertas_cercanas,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las alertas",
      error: error.message,
    });
  }
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
  obtenerAlertasComunidad,
  crearComunidades,
  unirseComunidad,
  salirDeComunidad,
  obtenerComunidadesPorUsuario,
  eliminarComunidad,
  editarComunidad,
};
