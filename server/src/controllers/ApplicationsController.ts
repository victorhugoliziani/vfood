import {Request, Response} from 'express';
import knex from '../database/connection';

class ApplicationsController {
    async index(request: Request, response: Response) {
        const applications = await knex('applications').select('*');        
        return response.json(applications);
    }
    async create(request: Request, response: Response) {
        const {name, route} = request.body;
        try {
            const trx = await knex.transaction();
            const application = {
                name,
                route
            }
            const insertId = await trx('applications').insert(application);
            const application_id = insertId[0];
            await trx.commit();
            return response.json({
                insert: true,
                id: application_id,
                ...application
            });
        } catch(error) {
            return response.json({
                insert: false,
                message: error
            })
        }
    }
    async update(request: Request, response: Response) {
        const {id, name, route} = request.body;
        const trx = await knex.transaction();
        const application = {
            name,
            route
        }
        const updateApplication = await trx('applications')
            .where('id', '=', id)
            .update(application);
        await trx.commit();
        return response.json({
            id,
            ...application
        });
    }
    async destroy(request: Request, response: Response) {
        const {id} = request.params;
        const trx = await knex.transaction();
        const deleteApplication = await trx('applications')
            .where('id', '=', id)
            .del();
        await trx.commit();
        const deleteSuccess = deleteApplication == 1;
        return response.json({
            delete: deleteSuccess,
            id
        });
    }
}
export default ApplicationsController;