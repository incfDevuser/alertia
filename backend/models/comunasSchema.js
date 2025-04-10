import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ComunaSchema = new mongoose.Schema(
  {
    nombre_comuna: {
      type: String,
      required: true,
    },
    zona: {
      type: {
        type: String,
        enum: ["Polygon"],
        required: true,
      },
      coordinates: {
        type: [[[Number]]],
        required: true,
        validate: {
          validator: function (coords) {
            return (
              coords[0].length >= 4 &&
              JSON.stringify(coords[0][0]) ===
                JSON.stringify(coords[0][coords[0].length - 1])
            );
          },
          message: "El polígono debe tener al menos 3 puntos y estar cerrado",
        },
      },
    },
    comunidades: [
      {
        type: ObjectId,
        ref: "Comunidad",
      },
    ],
  },
  {
    timestamps: true,
  }
);
ComunaSchema.index({ zona: "2dsphere" });
const Comuna = mongoose.model("Comuna", ComunaSchema);
export default Comuna;
