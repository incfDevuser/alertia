import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ComunidadSchema = new mongoose.Schema({
  nombre_comunidad: {
    type: String,
    required: true,
  },
  miembros: [
    {
      usuario: {
        type: ObjectId,
        ref: "Usuario",
        required: true,
      },
    },
  ],
  color_comunidad: {
    type: String,
    enum: ["rojo", "azul", "verde", "amarillo", "naranja"],
    required: true,
  },
  zona: {
    type: { type: String, enum: ["Polygon"], default: "Polygon" },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
  admin_comunidad: {
    type: ObjectId,
    ref: "Usuario",
    required: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  alertas: [
    {
      type: ObjectId,
      ref: "Alerta",
    },
  ],
  alertas_areas: [
    {
      type: ObjectId,
      ref: "AlertaArea",
    },
  ],
  alertas_direccion: [
    {
      type: ObjectId,
      ref: "AlertaDireccion",
    },
  ],
  rutas_seguros: [
    {
      type: ObjectId,
      ref: "RutaSegura",
    },
  ],
  reportes: [
    {
      type: ObjectId,
      ref: "Reporte",
    },
  ],
});
ComunidadSchema.index({ zona: "2dsphere" });
const Comunidad = mongoose.model("Comunidad", ComunidadSchema);
export default Comunidad;
