import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const AlertaAreaSchema = new mongoose.Schema({
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
  area_afectada: {
    type: { type: String, enum: ["Polygon"], default: "Polygon" },
    coordinates: {
      type: [[[Number]]],
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
AlertaAreaSchema.index({ area_afectada: "2dsphere" });
const AlertaArea = mongoose.model("AlertaArea", AlertaAreaSchema);
export default AlertaArea;
