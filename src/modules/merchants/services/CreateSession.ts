import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';

interface ICreateSession {
  email: string;
  password: string;
}

export class CreateSession {
  async execute({ email, password }: ICreateSession) {
    const merchant = await prisma.merchant.findUnique({
      where: {
        email,
      },
    });
    if (!merchant) {
      throw new AppError('Usuario ou senha invalido', 401);
    }

    const password_confirmed = await compare(password, merchant.password);

    if (!password_confirmed) {
      throw new AppError('Usuario ou senha invalido', 401);
    }

    return merchant;
  }
}
