import {Request, Response} from 'express';
import knex from '../database/connection';

class CategoriesController {
    
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

}

export default CategoriesController;