import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  data: string;
}
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Esta faltando o token');
  }

  const [, token] = authHeader.split(' ');

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decodedToken = verify(token, authConfig.jwt.secret);
    //finalizar essa parte

    const { data } = decodedToken as ITokenPayload;

    request.merchant = {
      id: data,
    };
    return next();
  } catch {
    throw new AppError('token jwt invalido');
  }
}
