// models/Monitoring.js
import mongoose from 'mongoose';

const monitoringSchema = new mongoose.Schema({
  activityType: { type: String, required: true }, // contoh: 'Evaluasi Kurikulum', 'Monitoring Kelas'
  date: { type: Date, required: true },
  details: { type: String },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  results: { type: String },
}, { timestamps: true });

const Monitoring = mongoose.model('Monitoring', monitoringSchema);
export default Monitoring;