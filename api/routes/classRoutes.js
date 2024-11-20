import express from 'express';
import { getClasses, createClass, updateClass, deleteClass } from '../controllers/Class.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken(["student", "teacher", "superadmin"]), getClasses);
router.post('/', verifyToken(["teacher", "superadmin"]), createClass);
router.put('/:id', verifyToken(["teacher", "superadmin"]), updateClass);
router.delete('/:id', verifyToken(["superadmin"]), deleteClass);

export default router;
