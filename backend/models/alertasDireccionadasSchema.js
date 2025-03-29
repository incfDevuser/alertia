import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const AlertaDireccionadaSchema = new mongoose.Schema({
  tipo_alerta: {
    type: String,
    enum: ["emergencia", "seguridad", "incidente", "otros"],
    required: true,
  },
  creada_por: {
    type: ObjectId,
    ref: "Usuario",
    required: true,
  },
  trayectoria: {
    type: { type: String, enum: ["LineString"], default: "LineString" },
    coordinates: {
      type: [[Number]],
      required: true,
    },
  },
  descripcion: {
    type: String,
    required: true,
  },
  comunidades_alertadas: [
    {
      type: ObjectId,
      ref: "Comunidad",
    },
  ],
  estado: {
    type: String,
    enum: ["pendiente", "confirmada", "desmentida"],
    default: "pendiente",
  },
  mov_brusco: {
    type: Boolean,
    default: false,
  },
  reporte: {
    type: ObjectId,
    ref: "Reporte",
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
});
AlertaDireccionadaSchema.index({ trayectoria: "2dsphere" });
const AlertaDireccionada = mongoose.model(
  "AlertaDireccionada",
  AlertaDireccionadaSchema
);
export default AlertaDireccionada;
