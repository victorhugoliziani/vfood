import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('permissions', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('permissions');
}