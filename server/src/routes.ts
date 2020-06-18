import express from 'express';
import CategoriesController from './controllers/CategoriesController';

const routes = express.Router();

const categoriesController =new CategoriesController();

routes.post('/categories', categoriesController.create);

export default routes;