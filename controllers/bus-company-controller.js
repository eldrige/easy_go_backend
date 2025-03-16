import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';

export const createBusCompany = catchAsync(async (req, res) => {
  const { name, phone, email } = req.body;
  const property = await prisma.busCompany.create({
    data: {
      name,
      phone,
      email,
    },
  });
  res.json(property);
});

export const getBusCompanies = catchAsync(async (_, res) => {
  const properties = await prisma.busCompany.findMany();
  res.json(properties);
});

export const updateBusCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const property = await prisma.busCompany.update({
    where: { id },
    data: req.body,
  });
  res.json(property);
});

export const getBusCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const property = await prisma.busCompany.findUnique({
    where: { id },
    include: { routes: true },
  });
  res.json(property);
});

export const deleteBusCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  await prisma.busCompany.delete({ where: { id } });
  res.json({ message: 'Bus company deleted' });
});
