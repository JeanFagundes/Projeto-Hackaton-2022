import { prisma } from '@shared/database/prismaClient';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

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

    const token = sign({ email }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { merchant, token };
  }
}
