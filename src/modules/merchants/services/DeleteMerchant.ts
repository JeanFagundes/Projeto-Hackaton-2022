import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';

interface IDeleteMerchant {
  merchant_id: number;
}

export class DeleteMerchant {
  async execute({ merchant_id }: IDeleteMerchant) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchant_id },
    });

    if (!merchant) {
      throw new AppError('Comerciante não encontrado');
    }

    await prisma.merchant.delete({
      where: {
        id: merchant_id,
      },
    });
  }
}
