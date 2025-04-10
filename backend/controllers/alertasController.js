import Alerta from "../models/alertasSchema.js";
import Comunidad from "../models/comunidadesSchema.js";
import * as turf from "@turf/turf";

const obtenerAlertas = async (req, res) => {
  try {
    const alertas = await Alerta.find();
    return res.status(201).json({
      message: "Alertas obtenidas",
      alertas,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las alertas",
      error: error.message,
    });
  }
};
const crearAlerta = async (req, res) => {
  try {
    const { tipo_alerta, ubicacion, descripcion } = req.body;
    const userId = req.user._id;
    const nuevaAlerta = new Alerta({
      tipo_alerta,
      creada_por: userId,
      ubicacion,
      descripcion,
    });
    await nuevaAlerta.save();
    const puntoAlerta = turf.point(ubicacion.coordinates);
    const comunidadesDentro = await Comunidad.find({
      zona: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: ubicacion.coordinates,
          },
        },
      },
    });
    for (const comunidad of comunidadesDentro) {
      comunidad.alertas.push(nuevaAlerta._id);
      nuevaAlerta.comunidades_alertadas.push(comunidad._id);
      await comunidad.save();
    }
    const comunidadesIds = comunidadesDentro.map((c) => c._id.toString());
    const todasComunidades = await Comunidad.find({
      _id: { $nin: comunidadesIds },
    });

    const radioProximidadKm = 1;
    for (const comunidad of todasComunidades) {
      const poligono = turf.polygon(comunidad.zona.coordinates);
      const distancia = turf.pointToLineDistance(
        puntoAlerta,
        turf.lineString(poligono.geometry.coordinates[0]),
        { units: "kilometers" }
      );
      if (distancia <= radioProximidadKm) {
        comunidad.alertas_cercanas.push(nuevaAlerta._id);
        await comunidad.save();
      }
    }
    await nuevaAlerta.save();
    return res.status(201).json({
      message: "Alerta creada exitosamente",
      alerta: nuevaAlerta,
      comunidades_afectadas: {
        dentro: comunidadesDentro.length,
        cercanas: todasComunidades.filter((c) =>
          c.alertas_cercanas.includes(nuevaAlerta._id)
        ).length,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al crear la alerta",
      error: error.message,
    });
  }
};
export const AlertasController = {
  obtenerAlertas,
  crearAlerta
};  
