import express from 'express';
import { getSupports, createSupport, updateSupport, deleteSupport } from '../controllers/Support.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken(["student", "teacher", "superadmin"]), getSupports);
router.post('/', verifyToken(["superadmin"]), createSupport);
router.put('/:id', verifyToken(["superadmin"]), updateSupport);
router.delete('/:id', verifyToken(["superadmin"]), deleteSupport);

export default router;
