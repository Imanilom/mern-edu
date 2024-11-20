import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken(["student", "teacher", "superadmin"]), updateUser);
router.delete('/delete/:id', verifyToken(["student", "teacher", "superadmin"]), deleteUser);

export default router;