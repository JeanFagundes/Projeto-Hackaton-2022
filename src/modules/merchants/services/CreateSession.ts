import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { prisma } from '@shared/database/prismaClient';
import { Merchant } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ICreateSession {
  email: string;
  password: string;
}

interface IResponse {
  merchant: Merchant;
  token: string;
}

export class CreateSession {
  async execute({ email, password }: ICreateSession): Promise<IResponse> {
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

    //finalizar essa parte
    const token = sign({ data: merchant.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { merchant, token };
  }
}
