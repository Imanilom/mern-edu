// models/Schedule.js
import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  time: { type: String, required: true }, // contoh: '08:00 - 10:00'
  classes: [
    {
      class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
      subject: { type: String, required: true }, // ambil dari kurikulum
    },
  ],
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;
