import { Request, Response } from 'express';
import { CreateDocumentImages } from '../services/CreateDocumentImages';

export default class MerchantDocumentController {
  async update(request: Request, response: Response): Promise<Response> {
    const createDocumentImages = new CreateDocumentImages();

    const merchantId = parseInt(request.user.id);
    console.log('aqui a porra do request', request.user.id);

    console.log('id aqui caralho', merchantId);

    const merchant = createDocumentImages.execute({
      merchant_id: merchantId,
      photoFilename: request.file?.filename,
    });
    return response.json(merchant);
  }
}
