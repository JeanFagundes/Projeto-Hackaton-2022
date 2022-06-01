import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';

interface ICompanyAddress {
  merchant_id: number;
  cep: string;
  address: string;
  number: string;
  complement: string;
  state: string;
  city: string;
}

export class CompanyAddress {
  async execute({
    merchant_id,
    cep,
    address,
    number,
    complement,
    state,
    city,
  }: ICompanyAddress) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchant_id },
    });
    if (!merchant) {
      throw new AppError('Comerciante não encontrado');
    }

    const companyAddress = await prisma.companyAddress.create({
      data: {
        merchant_id,
        cep,
        address,
        number,
        complement,
        state,
        city,
      },
    });

    return companyAddress;
  }
}
