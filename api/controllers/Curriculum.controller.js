import Curriculum from '../models/Curriculum.js';
import Class from '../models/Class.js';

export const getCurriculums = async (req, res) => {
  try {
    const curriculums = await Curriculum.find();
    res.status(200).json(curriculums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCurriculum = async (req, res) => {
  const { semester, startDate, endDate, packageType, subjects } = req.body;
  
  if (!semester || !startDate || !endDate || !packageType || !subjects) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const curriculum = new Curriculum(req.body);
  try {
    const newCurriculum = await curriculum.save();
    res.status(201).json(newCurriculum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCurriculum = async (req, res) => {
  const { id } = req.params;
  const { semester, startDate, endDate, packageType, subjects } = req.body;

  if (!semester || !startDate || !endDate || !packageType || !subjects) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const updatedCurriculum = await Curriculum.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCurriculum) {
      return res.status(404).json({ message: 'Curriculum not found' });
    }
    res.status(200).json(updatedCurriculum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCurriculum = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCurriculum = await Curriculum.findByIdAndDelete(id);
    if (!deletedCurriculum) {
      return res.status(404).json({ message: 'Curriculum not found' });
    }
    res.status(200).json({ message: 'Curriculum deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New method to get classes by package type
export const getClassesByPackageType = async (req, res) => {
  const { packageType } = req.params;

  try {
    const classes = await Class.find({ packageType }).populate('teacher');
    const curriculums = await Curriculum.find({ packageType });

    const result = classes.map((classItem) => ({
      class: classItem,
      subjects: curriculums.flatMap((curriculum) => curriculum.subjects)
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
