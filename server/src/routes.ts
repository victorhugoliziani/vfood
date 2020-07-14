import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

import CategoriesController from './controllers/CategoriesController';

const routes = express.Router();
const upload = multer(multerConfig);

const categoriesController =new CategoriesController();

routes.post('/categories', upload.single('image'), celebrate({
   body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        parent_id: Joi.string()
   })
}, {
    abortEarly: false
}), categoriesController.create);

routes.get('/categories', categoriesController.index);
routes.get('/categories/:id', categoriesController.show);
routes.put('/categories', upload.single('image'), categoriesController.update);

export default routes;