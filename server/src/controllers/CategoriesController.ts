import {Request, Response} from 'express';
import knex from '../database/connection';

class CategoriesController {

    async index(request: Request, response: Response) {
        const categories = await knex('categories').select('*');
        const serializeCategories = categories.map(category => {
            return {
                id: category.id,
                name: category.name,
                description: category.description,
                parent_id: category.parent_id,
                image: `http://192.168.0.20:3333/uploads/${category.image}`
            }
        });

        return response.json(serializeCategories);
        
    }

    async show(request: Request, response: Response) {
        const {id} = request.params;
        const category = await knex('categories').where('id', id).first();
        const serializeCategory = {
            ...category,
            url_image: `http://192.168.0.20:3333/uploads/${category.image}`
        }
        return response.json(serializeCategory);
    }
    
    async create(request: Request, response: Response) {

        const {
            name,
            description,
            image,
            parent_id
        } = request.body;

        const trx = await knex.transaction();

        const category = {
            name,
            description,
            image: request.file.filename,
            parent_id
        }

        const insertId = await trx('categories').insert(category);
        const category_id = insertId[0];
        await trx.commit();
        return response .json({
            id: category_id,
            ...category
        });
    }

    async update(request: Request, response: Response) {
        const {
            id,
            name,
            description,
            image, 
            parent_id
        } = request.body;

        let category = {};
        if(request.file) {
            category = {
                name,
                description,
                image: request.file ? request.file.filename : '',
                parent_id
            }
        } else {
            category = {
                name,
                description,
                parent_id
            }
        }

        const trx = await knex.transaction();

        const updateCategory = await trx('categories')
            .where('id', '=', id)
            .update(category);

        await trx.commit();

        return response.json({
            id,
            ...category
        });

    }

    async destroy(request: Request, response: Response) {
        const {id} = request.params;

        const trx = await knex.transaction();

        const deleteCategory = await trx('categories')
            .where('id', '=', id)
            .del();

        await trx.commit();

        const deleteSuccess = deleteCategory == 1;

        return response.json({
            deleteSuccess,
            id
        });
    }

}

export default CategoriesController;