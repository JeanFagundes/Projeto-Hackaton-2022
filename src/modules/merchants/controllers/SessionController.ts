import { Request, Response } from 'express';
import { CreateSession } from './../services/CreateSession';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const create_session = new CreateSession();

    const merchant = await create_session.execute({
      email,
      password,
    });

    return response.json(merchant);
  }
}
