import * as turf from "@turf/turf";
import Comuna from "../models/comunasSchema.js";
import Comunidad from "../models/comunidadesSchema.js";

const asignarComunidadEnComuna = async (nuevaComunidad) => {
  try {
    if (!nuevaComunidad?.zona?.coordinates) {
      console.error("La comunidad no tiene una zona válida");
      return;
    }
    const centro = turf.center(turf.polygon(nuevaComunidad.zona.coordinates));
    const puntoCentro = {
      type: "Point",
      coordinates: centro.geometry.coordinates,
    };
    const comunaEncontrada = await Comuna.findOne({
      zona: {
        $geoIntersects: {
          $geometry: puntoCentro,
        },
      },
    });
    if (comunaEncontrada) {
      if (!comunaEncontrada.comunidades.includes(nuevaComunidad._id)) {
        comunaEncontrada.comunidades.push(nuevaComunidad._id);
        await comunaEncontrada.save();
        console.log(
          `Comunidad ${nuevaComunidad.nombre_comunidad} asignada a la comuna ${comunaEncontrada.nombre_comuna}`
        );
      }
    } else {
      console.log("No se encontró una comuna que contenga la comunidad");
    }
  } catch (error) {
    console.error("Error al asignar comunidad a comuna:", error);
  }
};

export default asignarComunidadEnComuna;
