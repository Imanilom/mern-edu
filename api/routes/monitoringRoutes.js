import express from 'express';
import { getMonitorings, createMonitoring, updateMonitoring, deleteMonitoring } from '../controllers/Monitoring.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken(["teacher", "superadmin"]), getMonitorings);
router.post('/create', verifyToken(["superadmin"]), createMonitoring);
router.put('/update/:id', verifyToken(["superadmin"]), updateMonitoring);
router.delete('/delete/:id', verifyToken(["superadmin"]), deleteMonitoring);

export default router;
