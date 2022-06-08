import { Router } from 'express';
import MerchantController from './../controllers/MerchantController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadconfig from '@config/uploadImages';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import MerchantDocumentController from '../controllers/MerchantDocumentController';

const merchants_routes = Router();
const merchant_controller = new MerchantController();
const merchantDocumentController = new MerchantDocumentController();

const upload = multer(uploadconfig);

merchants_routes.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).required(),
      company_name: Joi.string().min(4).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  merchant_controller.create,
);

merchants_routes.patch(
  '/photo',
  isAuthenticated,
  upload.single('photo'),
  merchantDocumentController.update,
);

export default merchants_routes;
