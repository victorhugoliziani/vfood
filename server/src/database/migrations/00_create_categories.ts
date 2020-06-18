import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('image').notNullable();
        table.integer('parent_id');
    });
}

export async function down(knex: Knex) {
    knex.schema.dropTable('categories');
}