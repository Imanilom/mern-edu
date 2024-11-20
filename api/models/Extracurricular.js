// models/Extracurricular.js
import mongoose from 'mongoose';

const extracurricularSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  schedule: {
    day: { type: String },
    time: { type: String }, // contoh: '15:00 - 17:00'
  },
}, { timestamps: true });

const Extracurricular = mongoose.model('Extracurricular', extracurricularSchema);
export default Extracurricular;
