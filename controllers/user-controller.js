import prisma from '../prisma-client.js';
import bcrypt from 'bcryptjs';
import catchAsync from '../utils/catch-async.js';
import AppError from '../utils/appError.js';
import { createSendToken } from '../utils/index.js';

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

export const getMe = catchAsync(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  res.json({
    status: 200,
    user,
  });
});

export const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError('Please provide all the required fields', 400));
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) return next(new AppError('Email is already in use', 400));
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide all the required fields', 400));
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return next(new AppError('Invalid email or password', 401));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError('Invalid email or password', 401));
  createSendToken(user, 200, res);
});
