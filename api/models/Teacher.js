import mongoose from 'mongoose';

// Define the teacher schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualifications: { type: String, required: true },
  subjects: [
    {
      name: { type: String, required: true }, // Subject name
      curriculumId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Curriculum', // Reference to the Curriculum model
        required: true 
      },
    }
  ],
  location: { type: String, required: true },
}, { timestamps: true });

// Create the Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;