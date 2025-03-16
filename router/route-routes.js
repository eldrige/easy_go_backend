import express from 'express';
import {
  createRoute,
  deleteRoute,
  getRoute,
  getRoutes,
} from '../controllers/route-controller.js';
import { authenticateUser } from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/', getRoutes);
router.get('/:id', getRoute);
router.use(authenticateUser);
router.post('/', createRoute);
router.delete('/:id', deleteRoute);

export default router;
