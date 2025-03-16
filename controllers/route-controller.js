import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';

export const createRoute = catchAsync(async (req, res) => {
  const { bus_company_id, to, from } = req.body;
  const property = await prisma.route.create({
    data: {
      bus_company_id,
      from,
      to,
    },
  });
  res.json(property);
});

export const getRoutes = catchAsync(async (_, res) => {
  const routes = await prisma.route.findMany();
  res.json(routes);
});

export const getRoute = catchAsync(async (req, res) => {
  const { id } = req.params;
  const route = await prisma.route.findUnique({
    where: { id },
  });
  res.json(route);
});

export const deleteRoute = catchAsync(async (req, res) => {
  const { id } = req.params;
  await prisma.route.delete({ where: { id } });
  res.json({ message: 'Route deleted' });
});
