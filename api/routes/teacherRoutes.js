import express from 'express';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../controllers/Teacher.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken(["student", "teacher", "superadmin"]), getTeachers);
router.post('', verifyToken(["superadmin"]), createTeacher);
router.put('/:id', verifyToken(["superadmin"]), updateTeacher);
router.delete('/:id', verifyToken(["superadmin"]), deleteTeacher);

export default router;
