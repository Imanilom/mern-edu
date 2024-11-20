// routes/subjectRoutes.js
import express from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} from '../controllers/Subject.controller.js';

const router = express.Router();

// Routes for subjects
router.post('/', createSubject);            // Create a new subject
router.get('/', getAllSubjects);             // Get all subjects
router.get('/:id', getSubjectById);          // Get a subject by ID
router.put('/:id', updateSubject);           // Update a subject
router.delete('/:id', deleteSubject);        // Delete a subject

export default router;