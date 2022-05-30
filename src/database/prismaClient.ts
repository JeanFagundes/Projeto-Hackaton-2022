import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function execute() {
  const result = await prisma.merchant.create({
    data: {
      company_name: 'uol',
      email: 'jean-cabral@hotmail.com',
      name: 'jean',
      password: 'jean123',
    },
  });
  console.log(result);
}

execute();
