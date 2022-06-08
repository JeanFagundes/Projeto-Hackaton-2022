import { Request, Response } from 'express';
import { CreateDocumentImages } from '../services/CreateDocumentImages';

export default class MerchantDocumentController {
  async update(request: Request, response: Response): Promise<Response> {
    const createDocumentImages = new CreateDocumentImages();

    const merchantId = parseInt(request.merchant.id);

    const merchant = createDocumentImages.execute({
      merchant_id: merchantId,
      photoFilename: request.file?.filename,
    });
    return response.json(merchant);
  }
}
