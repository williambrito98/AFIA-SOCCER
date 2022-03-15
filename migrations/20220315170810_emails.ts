import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.withSchema(process.env.DB_SCHEMA).createTable('emails', function (table) {
    table.increments()
    table.string('nome').nullable()
    table.string('apelido').nullable()
    table.string('email').nullable()
    table.string('celular').nullable()
    table.string('id_email').nullable()
    table.string('url_card_pipefy').nullable()
    table.string('referencia').nullable()
    table.boolean('enviado').defaultTo(false)
    table.timestamp('created_at')
    table.timestamp('updated_at')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('emails')
}
