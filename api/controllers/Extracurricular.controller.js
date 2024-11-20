import Extracurricular from '../models/Extracurricular.js';

export const getExtracurriculars = async (req, res) => {
  try {
    const extracurriculars = await Extracurricular.find();
    res.status(200).json(extracurriculars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExtracurricular = async (req, res) => {
  const extracurricular = new Extracurricular(req.body);
  try {
    const newExtracurricular = await extracurricular.save();
    res.status(201).json(newExtracurricular);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateExtracurricular = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedExtracurricular = await Extracurricular.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedExtracurricular);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExtracurricular = async (req, res) => {
  const { id } = req.params;
  try {
    await Extracurricular.findByIdAndDelete(id);
    res.status(200).json({ message: 'Extracurricular deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
