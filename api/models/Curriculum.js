// models/Curriculum.js
import mongoose from 'mongoose';

const curriculumSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  packageType: { type: String, required: true, enum: ['A', 'B', 'C'] },
  subjects: [
    {
      name: { type: String, required: true },
      extraActivities: { type: [String] }, // contoh: ['Seni', 'Olahraga']
    },
  ],
}, { timestamps: true });

const Curriculum = mongoose.model('Curriculum', curriculumSchema);
export default Curriculum;
