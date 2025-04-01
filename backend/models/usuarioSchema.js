import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre_completo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  google_id: {
    type: String,
  },
  apple_id: {
    type: String,
  },
  facebook_id: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  comunidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comunidad",
  },
  rol: {
    type: String,
    enum: ["admin", "miembro", "admin_comunidad", "usuario"],
    default: "usuario",
    required: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  configuracion_alertas: {
    sms: {
      type: Boolean,
      default: false,
    },
    alerta_movimiento: {
      type: Boolean,
      default: false,
    },
  },
  ubicacion: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
UsuarioSchema.index({ ubicacion: "2dsphere" });
const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;
