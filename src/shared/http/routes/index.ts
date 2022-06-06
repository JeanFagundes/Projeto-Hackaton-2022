import { Router } from 'express';
import sessions_routes from '@modules/merchants/routes/sessions_routes';
import merchant_routes from '@modules/merchants/routes/merchant_routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dev!' });
});

routes.use('/sessions', sessions_routes);
routes.use('/merchant', merchant_routes);

export default routes;
