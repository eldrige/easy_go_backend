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
