import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('profiles_applications_permissions', table => {
        table.increments('id').primary();
        table.integer('profiles_id').notNullable();
        table.integer('applications_id').notNullable();
        table.integer('permissions_id').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('profiles_applications_permissions');
}