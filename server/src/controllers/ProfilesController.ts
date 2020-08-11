import {Request, Response} from 'express';
import knex from '../database/connection';

interface Application {
    id: BigInteger,
    name: string,
    permissions: []
}

class ProfilesController {
    async index(request: Request, response: Response) {
        const profiles = await knex('profiles').select('*');
        return response.json(profiles);
    }
    async create(request: Request, response: Response) {
        const {profile_name, applications} = request.body;
        const trx = await knex.transaction();
        
        const profile = {
            name: profile_name
        }
        const profileID = await trx('profiles').insert(profile);
        let profiles_id = profileID[0];

        applications.map((application: Application)  => {
            let applications_id = application["id"];
            application["permissions"].map(async (permission) => {
                let permissions_id = permission["id"];
                let profiles_applications_permission = {
                    profiles_id,
                    applications_id,
                    permissions_id
                }
                let profiles_application_permissions_insert = await trx('profiles_applications_permissions').insert(profiles_applications_permission);
                await trx.commit();
            });
        });
        return response.json({
            profiles_id,
            ...profile
        })
    }
    async update(request: Request, response: Response) {
        const {id, profile_name, applications} = request.body;
        const trx = await knex.transaction();

        const deleteApplicationPermissions = await trx('profiles_applications_permissions')
            .where('profiles_id', '=', id)
            .del();
        
        
        const profile = {
            name: profile_name
        }
        const profile_update = await trx('profiles')
            .where('id', '=', id)
            .update(profile);

        applications.map((application: Application)  => {
            let applications_id = application["id"];
            application["permissions"].map(async (permission) => {
                let permissions_id = permission["id"];
                let profiles_applications_permission = {
                    profiles_id: id,
                    applications_id,
                    permissions_id
                }
                let profiles_application_permissions_insert = await trx('profiles_applications_permissions').insert(profiles_applications_permission);
                await trx.commit();
            });
        });
        return response.json({
            id,
            ...profile
        })
    }
    async destroy(request: Request, response: Response) {
        const {id} = request.params;
        const trx = await knex.transaction();
        const profiles_applications_permissions = await trx('profiles_applications_permissions')
            .where('profiles_id', '=', id)
            .del();
        const delete_profiles_applications_permissions = profiles_applications_permissions != null;
        if(delete_profiles_applications_permissions) {
            const profiles = await trx('profiles')
                .where('id', '=', id)
                .del();
            await trx.commit();
            const delete_profiles = profiles != null;
            if(delete_profiles) {
                return response.json({
                    delete: true,
                    id
                });
            } else {
                return response.json({
                    delete: false,
                    id
                })
            }
        }
    }
}
export default ProfilesController;