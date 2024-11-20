import Monitoring from '../models/Monitoring.js';

export const getMonitorings = async (req, res) => {
  try {
    const monitorings = await Monitoring.find();
    res.status(200).json(monitorings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMonitoring = async (req, res) => {
  const monitoring = new Monitoring(req.body);
  try {
    const newMonitoring = await monitoring.save();
    res.status(201).json(newMonitoring);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMonitoring = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMonitoring = await Monitoring.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedMonitoring);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMonitoring = async (req, res) => {
  const { id } = req.params;
  try {
    await Monitoring.findByIdAndDelete(id);
    res.status(200).json({ message: 'Monitoring deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
