// models/Class.js
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  classname: {
    type: String,
    required: false,
  },
  packageType: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C'],
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true, // Ensure that a teacher is always assigned
  },
  facilities: [{
    type: String,
  }],
  onlineLink: {
    type: String,
    required: false, // Optional field for online class link
  },
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);
export default Class;