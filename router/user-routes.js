import express from 'express';
import {
  logout,
  getMe,
  login,
  signUp,
} from '../controllers/user-controller.js';
import { authenticateUser as authenticateUserMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', signUp);

router.use(authenticateUserMiddleware);
router.get('/me', getMe);
router.post('/logout', logout);

export default router;
