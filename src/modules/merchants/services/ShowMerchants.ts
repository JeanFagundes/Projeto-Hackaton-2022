import { Merchant } from '@prisma/client';
import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';

export class ShowMerchants {
  async execute(): Promise<Merchant[]> {
    const List_Merchants = await prisma.merchant.findMany();

    if (List_Merchants.length < 1) {
      throw new AppError('Não existe nenhum comerciante cadastrado');
    }

    return List_Merchants;
  }
}
