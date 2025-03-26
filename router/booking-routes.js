import express from 'express';
import {
  createBooking,
  // updateBookingStatus,
  getMyBookings,
  getMyBookingByID,
} from '../controllers/booking-controller.js';
import {
  authenticateUser,
  authorizeRole,
} from '../middleware/auth-middleware.js';

const router = express.Router();
router.use(authenticateUser);

router.get('/my-bookings', getMyBookings);
// router.get('/host-bookings', authorizeRole(['HOST']), getMyBookingsAsHost);
router.post('/:id', getMyBookingByID);

router.post('/', createBooking);
// router.put('/:id/status', authorizeRole(['HOST']), updateBookingStatus);

export default router;
