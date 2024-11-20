// controllers/financingController.js
import Financing from '../models/Financing.js';

// Get all financing records
export const getAllFinancing = async (req, res) => {
  try {
    const financings = await Financing.find();
    res.status(200).json(financings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single financing record by ID
export const getFinancingById = async (req, res) => {
  try {
    const financing = await Financing.findById(req.params.id);
    if (!financing) return res.status(404).json({ message: "Financing record not found" });
    res.status(200).json(financing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new financing record
export const createFinancing = async (req, res) => {
  const { year, packageType, budgetAmount, fundingSource, allocations } = req.body;
  try {
    const newFinancing = new Financing({
      year,
      packageType,
      budgetAmount,
      fundingSource,
      allocations,
    });
    await newFinancing.save();
    res.status(201).json(newFinancing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a financing record by ID
export const updateFinancing = async (req, res) => {
  try {
    const updatedFinancing = await Financing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFinancing) return res.status(404).json({ message: "Financing record not found" });
    res.status(200).json(updatedFinancing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a financing record by ID
export const deleteFinancing = async (req, res) => {
  try {
    const deletedFinancing = await Financing.findByIdAndDelete(req.params.id);
    if (!deletedFinancing) return res.status(404).json({ message: "Financing record not found" });
    res.status(200).json({ message: "Financing record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add an expenditure to a financing record
export const addExpenditure = async (req, res) => {
  const { date, description, category, amount, status } = req.body;
  try {
    const financing = await Financing.findById(req.params.id);
    if (!financing) return res.status(404).json({ message: "Financing record not found" });

    // Create a new expenditure object
    const expenditure = { date, description, category, amount, status };

    // Use addExpenditure method from model to update total spent and remaining budget
    await financing.addExpenditure(expenditure);

    res.status(200).json(financing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenditures of a financing record
export const getExpenditures = async (req, res) => {
  try {
    const financing = await Financing.findById(req.params.id);
    if (!financing) return res.status(404).json({ message: "Financing record not found" });

    res.status(200).json(financing.expenditures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
