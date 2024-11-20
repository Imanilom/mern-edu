// models/Support.js
import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
  resourceType: { type: String, required: true }, // contoh: 'Buku Teks', 'Komputer'
  description: { type: String },
  quantity: { type: Number, default: 1 },
  available: { type: Boolean, default: true },
  location: { type: [String], required: true },
}, { timestamps: true });

const Support = mongoose.model('Support', supportSchema);
export default Support;
