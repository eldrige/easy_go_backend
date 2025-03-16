import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';

export class CrudFactory {
  constructor(entity, { defaultInclude, defaultOmit } = {}) {
    this.entity = entity;
    this.defaultInclude = defaultInclude || {};
    this.defaultOmit = defaultOmit || {};
  }

  create = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await prisma[this.entity].create({ data });
    res.json(result);
  });

  readAll = catchAsync(async (req, res) => {
    const queryInclude = this.parseRelations(req.query.include);
    const queryOmit = this.parseFields(req.query.omit);

    const results = await prisma[this.entity].findMany({
      include: { ...this.defaultInclude, ...queryInclude },
      omit: { ...this.defaultOmit, ...queryOmit },
    });

    res.json(results);
  });

  readOne = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await prisma[this.entity].findUnique({ where: { id } });
    res.json(result);
  });

  update = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await prisma[this.entity].update({ where: { id }, data });
    res.json(result);
  });

  delete = catchAsync(async (req, res) => {
    const id = req.params.id;
    await prisma[this.entity].delete({ where: { id } });
    res.json({ message: `${this.entity} deleted` });
  });

  parseRelations = (queryString) => {
    if (!queryString) return {};
    return queryString.split(',').reduce((acc, relation) => {
      acc[relation] = true;
      return acc;
    }, {});
  };

  parseFields = (queryString) => {
    if (!queryString) return {};
    return queryString.split(',').reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
  };
}

// Usage
// const scheduleCrud = new CrudFactory('schedule');
// const routeCrud = new CrudFactory('route');
// const bookingCrud = new CrudFactory('booking');

// export const createSchedule = scheduleCrud.create;
// export const getSchedules = scheduleCrud.readAll;
// Similarly for other entities
