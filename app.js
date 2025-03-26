// const morgan = require('morgan');
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import AppError from './utils/appError.js';
import userRouter from './router/user-routes.js';
import busCompanyRouter from './router/bus-company-routes.js';
import routeRouter from './router/route-routes.js';
import scheduleRouter from './router/schedule-routes.js';
import bookingRouter from './router/booking-routes.js';

const app = express();

app.use(cors());
app.use(express.json({}));
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/bus-company/', busCompanyRouter);
app.use('/route/', routeRouter);
app.use('/schedule/', scheduleRouter);
app.use('/booking/', bookingRouter);

app.get('/', (req, res) => res.send('Welcome to EasyGo API'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
