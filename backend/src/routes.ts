
import { Router } from 'express'
const routes = Router();

import orphanagesController from './controllers/orphanagesController';

routes.get('/orphanages', orphanagesController.index);
routes.post('/orphanages', orphanagesController.create);
routes.get('/orphanages/:id', orphanagesController.show);

export default routes;