import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';

export const createBooking = catchAsync(async (req, res) => {
  const { schedule_id, amount } = req.body;
  const user_id = req.user.id;

  // const existingBooking = await prisma.booking.findFirst({
  //   where: {
  //     schedule_id,
  //     checkIn: { lte: checkOut },
  //     checkOut: { gte: checkIn },
  //   },
  // });

  // if (existingBooking)
  //   return res
  //     .status(400)
  //     .json({ error: 'You already have booked this ticket' });

  const booking = await prisma.booking.create({
    data: { user_id, schedule_id, amount },
  });

  res.json(booking);
});

export const updateBookingStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
  });
  res.json(booking);
});

export const getMyBookings = catchAsync(async (req, res) => {
  const user_id = req.user.id;
  const bookings = await prisma.booking.findMany({
    where: { user_id }, // Specify the booking ID you want to retrieve
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
      schedule: {
        include: {
          route: {
            select: {
              from: true,
              to: true,
              bus_company: {
                select: {
                  name: true,
                  phone: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!bookings) {
    return res.status(404).json({ error: 'No bookings found' });
  }
  res.json(bookings);
});

export const getMyBookingByID = catchAsync(async (req, res) => {
  const user_id = req.user.id;
  const bookings = await prisma.booking.findMany({
    where: {
      user_id,
    },
    include: {
      schedule: true,
      user: true,
    },
  });
  res.json(bookings);
});

export const getMyBookingsAsRenter = catchAsync(async (req, res) => {
  const renterId = req.user.id;
  const bookings = await prisma.booking.findMany({
    where: {
      renterId: renterId,
    },
    include: {
      renter: true,
      property: true,
      property: {
        include: {
          host: true,
        },
      },
    },
  });
  res.json(bookings);
});
