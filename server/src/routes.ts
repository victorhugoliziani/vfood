import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import CategoriesController from './controllers/CategoriesController';

const routes = express.Router();
const upload = multer(multerConfig);

const categoriesController =new CategoriesController();

routes.post('/categories', upload.single('image'), categoriesController.create);

export default routes;