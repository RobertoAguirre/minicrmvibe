import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: String,
  empresa: String,
  domicilio: String,
  notas: String,
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
