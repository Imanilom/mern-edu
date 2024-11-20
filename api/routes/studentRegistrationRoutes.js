// routes/studentRegistrationRoutes.js
import express from 'express';
import {
  registerStudent,
  getStudentById,
  updateStudentRegistration,
  deleteStudentRegistration,
} from '../controllers/studentRegistrationController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes with necessary middlewares
router.post('/register', verifyToken(['student', 'teacher', 'superadmin']), registerStudent);
router.get('/:id', verifyToken(['student', 'teacher','superadmin']), getStudentById);
router.put('/update/:id', verifyToken(['student', 'teacher', 'superadmin']), updateStudentRegistration);
router.delete('/delete/:id', verifyToken(['student', 'teacher', 'superadmin']), deleteStudentRegistration);

export default router;
