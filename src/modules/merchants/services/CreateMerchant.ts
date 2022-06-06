import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';
import validator from 'validator';
import { hash } from 'bcryptjs';

interface ICreateMerchant {
  name: string;
  company_name: string;
  email: string;
  password: string;
}

export class CreateMerchant {
  async execute({ name, company_name, email, password }: ICreateMerchant) {
    //validação de email
    if (!validator.isEmail(email)) {
      throw new AppError('Insira um email valido');
    }
    const merchantExists = await prisma.merchant.findUnique({
      where: {
        email,
      },
    });
    if (merchantExists) {
      throw new AppError('Ja tem um cadastro de comerciante com esse email');
    }

    const company_name_exists = await prisma.merchant.findUnique({
      where: {
        company_name,
      },
    });

    if (company_name_exists) {
      throw new AppError(
        'Ja existe uma empresa cadastrada com essa razão social',
      );
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
