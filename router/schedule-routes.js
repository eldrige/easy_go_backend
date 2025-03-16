import express from 'express';
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
} from '../controllers/schedule-controller.js';
import { authenticateUser } from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/', getSchedules);
router.get('/:id', getSchedule);
router.use(authenticateUser);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;
