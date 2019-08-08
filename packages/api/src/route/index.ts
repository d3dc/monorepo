import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import resource from './resource';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/resource', resource);
routes.use('/', (req, res) => res.sendStatus(200));

export default routes;
