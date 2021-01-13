
import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/upload'
import orphanagesController from './controllers/orphanagesController';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/orphanages', orphanagesController.index);
routes.post('/orphanages', upload.array('images'), orphanagesController.create);
routes.get('/orphanages/:id', orphanagesController.show);

export default routes;