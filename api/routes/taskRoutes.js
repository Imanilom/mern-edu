import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/Task.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken(["student", "teacher", "superadmin"]), getTasks);
router.post('/create', verifyToken(["teacher", "superadmin"]), createTask);
router.put('/update/:id', verifyToken(["teacher", "superadmin"]), updateTask);
router.delete('/delete/:id', verifyToken(["superadmin"]), deleteTask);

export default router;
