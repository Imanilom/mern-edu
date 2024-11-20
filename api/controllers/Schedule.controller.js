// controllers/ScheduleController.js
import Schedule from '../models/Schedule.js';

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all schedules
// Get all schedules
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate({
      path: 'classes.class',
      model: 'Class',
      populate: { path: 'teacher', model: 'Teacher' }
    }).populate('classes.subject');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a schedule by ID
export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate({
      path: 'classes.class',
      model: 'Class',
      populate: { path: 'teacher', model: 'Teacher' }
    }).populate('classes.subject');
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a schedule
export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a schedule
export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};