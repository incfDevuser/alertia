import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ReporteSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  tipo_reporte: {
    type: String,
    enum: ["emergencia", "seguridad", "incidente", "otros"],
    required: true,
  },
  reportado_por: {
    type: ObjectId,
    ref: "Usuario",
    required: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  ubicacion: {
    area: {
      type: { type: String, enum: ["Polygon"], default: "Polygon" },
      coordinates: {
        type: [[[Number]]],
        required: false,
      },
    },
    trayectoria: {
      type: { type: String, enum: ["LineString"], default: "LineString" },
      coordinates: {
        type: [[Number]],
        required: false,
      },
    },
    punto: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
  },
  foto: {
    type: String,
    required: false,
  },
});
ReporteSchema.index({ "ubicacion.area": "2dsphere" });
ReporteSchema.index({ "ubicacion.trayectoria": "2dsphere" });
ReporteSchema.index({ "ubicacion.punto": "2dsphere" });
const Reporte = mongoose.model("Reporte", ReporteSchema);
export default Reporte;
