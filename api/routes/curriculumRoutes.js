// routes/Curriculum.routes.js
import express from 'express';
import { getCurriculums, createCurriculum, updateCurriculum, deleteCurriculum, getClassesByPackageType } from '../controllers/Curriculum.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken(["student", "teacher", "superadmin"]), getCurriculums);
router.post('', verifyToken(["teacher", "superadmin"]), createCurriculum);
router.put('/:id', verifyToken(["teacher", "superadmin"]), updateCurriculum);
router.delete('/:id', verifyToken(["superadmin"]), deleteCurriculum);
router.get('/classes/:packageType', verifyToken(["student", "teacher", "superadmin"]), getClassesByPackageType); // New route

export default router;