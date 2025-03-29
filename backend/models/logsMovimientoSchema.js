import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const LogsMovimientoSchema = new mongoose.Schema({
  usuario: {
    type: ObjectId,
    ref: "Usuario",
    required: true,
  },
  nivel_movimiento: {
    type: Number,
    required: true,
    min: 0,
  },
  fecha_movimiento: {
    type: Date,
    default: Date.now,
  },
  ubicacion: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  cancelado: {
    type: Boolean,
    default: false,
  },
});
LogsMovimientoSchema.index({ ubicacion: "2dsphere" });
const LogsMovimiento = mongoose.model("LogsMovimiento", LogsMovimientoSchema);
export default LogsMovimiento;
