import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';

interface IFindOneMerchant {
  id: number;
}

export class FindOneMerchant {
  async execute({ id }: IFindOneMerchant) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: id },
    });

    if (!merchant) {
      throw new AppError('Comerciante não encontrado');
    }

    return merchant;
  }
}
