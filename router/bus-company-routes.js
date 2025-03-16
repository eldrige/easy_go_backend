import express from 'express';
import {
  createBusCompany,
  deleteBusCompany,
  getBusCompanies,
  getBusCompany,
  updateBusCompany,
} from '../controllers/bus-company-controller.js';
import { authenticateUser } from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/', getBusCompanies);
router.get('/:id', getBusCompany);
router.use(authenticateUser);
router.post('/', createBusCompany);
router.put('/:id', updateBusCompany);
router.delete('/:id', deleteBusCompany);

export default router;
