import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('permissions').insert([
        {name: 'insert', title: 'Inserir'},
        {name: 'update', title: 'Atualizar'},
        {name: 'delete', title: 'Deletar'},
        {name: 'view', title: 'Visualizar'}
    ]);
}