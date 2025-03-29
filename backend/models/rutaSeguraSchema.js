import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const RutaSeguraSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    segmentos: [
      {
        type: String,
        required: true,
      },
    ],
    coordenadas: {
      type: {
        type: String,
        enum: ["LineString"],
        default: "LineString",
      },
      coordinates: {
        type: [[Number]],
        required: true,
      },
    },
    proximidad_evento: {
      type: Number,
      required: true,
      min: 0,
      default: 100,
    },
    comunidades_cercanas: [
      {
        type: ObjectId,
        ref: "Comunidad",
      },
    ],
    nivel_seguridad: {
      type: String,
      enum: ["bajo", "medio", "alto"],
      required: true,
      default: "medio",
    },
    creada_por: {
      type: ObjectId,
      ref: "Usuario",
      required: true,
    },
    fecha_creacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
RutaSeguraSchema.index({ coordenadas: "2dsphere" });
const RutaSegura = mongoose.model("RutaSegura", RutaSeguraSchema);
export default RutaSegura;
