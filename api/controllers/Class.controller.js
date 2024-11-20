import Class from '../models/Class.js';

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('students teacher');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClass = async (req, res) => {
  const newClass = new Class(req.body);
  try {
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    await Class.findByIdAndDelete(id);
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
