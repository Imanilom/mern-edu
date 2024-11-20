import express from 'express';
import {
  getAllFinancing,
  getFinancingById,
  createFinancing,
  updateFinancing,
  deleteFinancing,
  addExpenditure,
  getExpenditures
} from '../controllers/Financing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Get all financing records
router.get('/', verifyToken(["student", "teacher", "superadmin"]), getAllFinancing);

// Get a single financing record by ID
router.get('/:id', verifyToken(["student", "teacher", "superadmin"]), getFinancingById);

// Create a new financing record
router.post('/create', verifyToken(["superadmin"]), createFinancing);

// Update a financing record by ID
router.put('/update/:id', verifyToken(["superadmin"]), updateFinancing);

// Delete a financing record by ID
router.delete('/delete/:id', verifyToken(["superadmin"]), deleteFinancing);

// Add an expenditure to a financing record
router.post('/:id/expenditure', verifyToken(["superadmin"]), addExpenditure);

// Get all expenditures of a financing record
router.get('/:id/expenditures', verifyToken(["student", "teacher", "superadmin"]), getExpenditures);

export default router;
