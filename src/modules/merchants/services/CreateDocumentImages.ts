import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';
import { Merchant } from '@prisma/client';
import path from 'path';
import uploadImages from '@config/uploadImages';
import fs from 'fs';

interface ICreateDocumentImages {
  merchant_id: number;
  photoFilename: string | undefined;
}

export class CreateDocumentImages {
  async execute({
    merchant_id,
    photoFilename,
  }: ICreateDocumentImages): Promise<Merchant> {
    const merchantExists = await prisma.merchant.findUnique({
      where: {
        id: merchant_id,
      },
    });
    if (!merchantExists) {
      throw new AppError('Comerciante não encontrado');
    }

    if (merchantExists.photo) {
      const merchantPhotoFilePath = path.join(
        uploadImages.directory,
        merchantExists.photo,
      );
      const merchantPhotoExists = await fs.promises.stat(merchantPhotoFilePath);
      if (merchantPhotoExists) {
        await fs.promises.unlink(merchantPhotoFilePath);
      }
    }
    return await prisma.merchant.update({
      where: { id: merchant_id },
      data: { photo: photoFilename },
    });
  }
}
