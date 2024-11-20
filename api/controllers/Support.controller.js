import Support from '../models/Support.js';

export const getSupports = async (req, res) => {
  try {
    const supports = await Support.find();
    res.status(200).json(supports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSupport = async (req, res) => {
  const support = new Support(req.body);
  try {
    const newSupport = await support.save();
    res.status(201).json(newSupport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSupport = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSupport = await Support.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedSupport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSupport = async (req, res) => {
  const { id } = req.params;
  try {
    await Support.findByIdAndDelete(id);
    res.status(200).json({ message: 'Support deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
