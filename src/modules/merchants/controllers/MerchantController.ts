import { Request, Response } from 'express';
import { CreateMerchant } from '../services/CreateMerchant';

export class MerchantController {
  async handle(request: Request, response: Response) {
    const { name, company_name, email, password } = request.body;

    const createMerchant = new CreateMerchant();

    const result = await createMerchant.execute({
      name,
      company_name,
      email,
      password,
    });

    return response.json(result);
  }
}
