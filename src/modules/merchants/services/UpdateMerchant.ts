import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';
import validator from 'validator';
import { hash, compare } from 'bcryptjs';
import { Merchant } from '@prisma/client';

interface IUpdateMerchantEmail {
  merchant_id: number;
  name?: string;
  email?: string;
  password: string;
  new_password?: string;
}

export class UpdateMerchantEmail {
  async execute({
    merchant_id,
    name,
    email,
    password,
    new_password,
  }: IUpdateMerchantEmail): Promise<Merchant | undefined> {
    //validação de email
    const merchantUpdate = await prisma.merchant.findUnique({
      where: {
        id: merchant_id,
      },
    });
    if (!merchantUpdate) {
      throw new AppError('Comerciante não encontrado');
    }

    if (name) {
      const checkPassword = await compare(password, merchantUpdate.password);

      if (!checkPassword) {
        throw new AppError(
          'A senha do comerciante para alterar o nome está incorreta',
        );
      }
      await prisma.merchant.update({
        where: {
          id: merchant_id,
        },
        data: {
          name: name,
        },
      });
      return merchantUpdate;
    }

    if (email) {
      const merchantUpdateEmail = await prisma.merchant.findUnique({
        where: {
          email,
        },
      });

      if (merchantUpdateEmail) {
        throw new AppError('Esse email ja está em uso');
      }

      const checkPassword = await compare(password, merchantUpdate.password);

      if (!checkPassword) {
        throw new AppError(
          'A senha do comerciante para alterar o email está incorreta',
        );
      }

      await prisma.merchant.update({
        where: {
          id: merchant_id,
        },
        data: {
          email: email,
        },
      });

      return merchantUpdate;
    }

    if (password && new_password) {
      const checkPassword = await compare(password, merchantUpdate.password);

      if (!checkPassword) {
        throw new AppError('A senha atual está incorreta');
      }

      //validação para usar senha em formato cripto
      if (!validator.isStrongPassword(new_password)) {
        throw new AppError(
          'Certifique que a senha tenha letras maiusculas, minusculas, numero e caracter especial',
        );
      }
      const hashPassword = await hash(new_password, 10);

      await prisma.merchant.update({
        where: {
          id: merchant_id,
        },
        data: {
          password: hashPassword,
        },
      });

      return merchantUpdate;
    }
  }
}
