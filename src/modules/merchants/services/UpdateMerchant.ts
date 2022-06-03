import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';
import validator from 'validator';
import { hash } from 'bcryptjs';

interface IUpdateMerchant {
  name: string;
  company_name: string;
  email: string;
  password: string;
}

export class UpdateMerchant {
  async execute({ name, company_name, email, password }: IUpdateMerchant) {
    //validação de email
    if (!validator.isEmail(email)) {
      throw new AppError('Insira um email valido');
    }
    const merchantExists = await prisma.merchant.findFirst({
      where: {
        email: {
          mode: 'insensitive',
        },
      },
    });
    if (merchantExists) {
      throw new AppError('Ja tem um cadastro de comerciante com esse email');
    }

    //validação de senha
    if (!validator.isStrongPassword(password)) {
      throw new AppError(
        'Certifique que a senha tenha letras maiusculas, minusculas, numero e caracter especial',
      );
    }

    const hashPassword = await hash(password, 10);

    const merchant = await prisma.merchant.create({
      data: {
        name,
        company_name,
        email,
        password: hashPassword,
      },
    });

    return merchant;
  }
}
