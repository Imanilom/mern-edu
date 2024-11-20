// controllers/studentRegistrationController.js
import StudentRegistration from '../models/StudentRegistration.js';

// Helper function to handle response
const handleResponse = (res, promise) => {
  promise
    .then((data) => {
      if (!data) return res.status(404).json({ message: 'Not found' });
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Register a new student
export const registerStudent = async (req, res) => {
  const data = { ...req.body };
  handleResponse(res, StudentRegistration.create(data));
};

// Get a student by ID
export const getStudentById = (req, res) => {
  handleResponse(res, StudentRegistration.findById(req.params.id));
};

// Update student registration details
export const updateStudentRegistration = (req, res) => {
  handleResponse(res, StudentRegistration.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

// Delete a student registration record by ID
export const deleteStudentRegistration = (req, res) => {
  handleResponse(res, StudentRegistration.findByIdAndDelete(req.params.id).then((result) => ({
    message: 'Student registration deleted successfully',
  })));
};
