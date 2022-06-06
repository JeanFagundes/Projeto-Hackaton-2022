import { Router } from 'express';
import MerchantController from './../controllers/MerchantController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessions_routes = Router();
const merchant_controller = new MerchantController();

sessions_routes.post(
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

export default sessions_routes;
