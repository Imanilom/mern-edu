import express from 'express';
import { getExtracurriculars, createExtracurricular, updateExtracurricular, deleteExtracurricular } from '../controllers/Extracurricular.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken(["student", "teacher", "superadmin"]), getExtracurriculars);
router.post('/', verifyToken(["teacher", "superadmin"]), createExtracurricular);
router.put('/:id', verifyToken(["teacher", "superadmin"]), updateExtracurricular);
router.delete('/:id', verifyToken(["superadmin"]), deleteExtracurricular);

export default router;
