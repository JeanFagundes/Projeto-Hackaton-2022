import { Router } from 'express';
import SessionsController from '../controllers/SessionController';

const sessions_routes = Router();
const sessions_controller = new SessionsController();

sessionsRouter.post('/');
