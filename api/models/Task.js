// models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  evaluations: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number, min: 0, max: 100 },
      remarks: { type: String },
    },
  ],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
