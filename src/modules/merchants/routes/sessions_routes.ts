import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionController';

const sessions_routes = Router();
const sessions_controller = new SessionsController();

sessions_routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessions_controller.create,
);

export default sessions_routes;
