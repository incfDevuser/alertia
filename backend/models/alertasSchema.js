import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const AlertaSchema = new mongoose.Schema({
  tipo_alerta: {
    type: String,
    enum: ['emergencia', 'seguridad', 'incidente', 'otros'],
    required: true
  },
  creada_por: {
    type: ObjectId,
    ref: 'Usuario',
    required: true
  },
  ubicacion: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  comunidades_alertadas: [{
    type: ObjectId,
    ref: 'Comunidad'
  }],
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'desmentida'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

AlertaSchema.index({ ubicacion: '2dsphere' });
const Alerta = mongoose.model('Alerta', AlertaSchema);
export default Alerta;
