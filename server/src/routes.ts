import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

import CategoriesController from './controllers/CategoriesController';
import ApplicationsController from './controllers/ApplicationsController';
import ProfilesController from './controllers/ProfilesController';

const routes = express.Router();
const upload = multer(multerConfig);

const categoriesController =new CategoriesController();
routes.post('/categories', upload.single('image'), categoriesController.create);
routes.get('/categories', categoriesController.index);
routes.get('/categories/:id', categoriesController.show);
routes.put('/categories', upload.single('image'), categoriesController.update);
routes.delete('/categories/:id',  categoriesController.destroy);

const applicationsController =new ApplicationsController();
routes.get('/applications', applicationsController.index);
routes.post('/applications', applicationsController.create);
routes.put('/applications', applicationsController.update);
routes.delete('/applications/:id', applicationsController.destroy);

const profilesController =new ProfilesController();
routes.get('/profiles', profilesController.index);
routes.post('/profiles', profilesController.create);
routes.put('/profiles', profilesController.update);
routes.delete('/profiles/:id', profilesController.destroy);

export default routes;