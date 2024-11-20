// models/StudentRegistration.js
import mongoose from 'mongoose';

const studentRegistrationSchema = new mongoose.Schema({
  packet: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nisn: {
    type: String,
    required: true,
    unique: true,
  },
  placeOfBirth: String,
  dateOfBirth: Date,
  religion: String,
  weight: Number,
  height: Number,
  childOrder: Number,
  siblingsCount: Number,
  address: String,
  village: String,
  district: String,
  province: String,
  fatherName: String,
  fatherJob: String,
  fatherPhone: String,
  motherName: String,
  motherJob: String,
  motherPhone: String,
  guardianName: String,
  guardianJob: String,
  guardianPhone: String,
  photo: {
    type: String, // URL path for the uploaded photo file
  },
  familyCardNumber: {
    type: String,
    required: true,
  },
  lastCertificate: {
    type: String, // URL path for the uploaded certificate file
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
});

export default mongoose.model('StudentRegistration', studentRegistrationSchema);