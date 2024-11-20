// routes/scheduleRoutes.js
import express from 'express';
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule
} from '../controllers/Schedule.controller.js';

const router = express.Router();

// Routes for schedules
router.post('/', createSchedule);              // Create a new schedule
router.get('/', getAllSchedules);               // Get all schedules
router.get('/:id', getScheduleById);            // Get a schedule by ID
router.put('/:id', updateSchedule);             // Update a schedule
router.delete('/:id', deleteSchedule);          // Delete a schedule

export default router;