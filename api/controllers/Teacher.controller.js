import Teacher from '../models/Teacher.js';

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeachersbyId = async (req, res) => {
    try {
     const id = req.params.id;
      const teachers = await Teacher.find(id);
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const createTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    await Teacher.findByIdAndDelete(id);
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
