import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';
import { CrudFactory } from './factory-controller.js';

const scheduleCrud = new CrudFactory('schedule', {
  defaultInclude: {
    route: true,
  },
});

export const createSchedule = scheduleCrud.create;
export const getSchedules = scheduleCrud.readAll;
export const getSchedule = scheduleCrud.readOne;
export const updateSchedule = scheduleCrud.update;
export const deleteSchedule = scheduleCrud.delete;

export const getSchedulesWithDetails = catchAsync(async (req, res) => {
  // const user_id = req.user.id;
  const schedules = await prisma.schedule.findMany({
    include: {
      route: true,
    },
  });
  res.json(schedules);
});
