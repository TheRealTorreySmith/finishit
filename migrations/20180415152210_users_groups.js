exports.up = (knex, Promise) => {
  return knex.schema.createTable('users_groups', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.integer('users_id').references('id').inTable('users').notNull().onDelete('CASCADE')
    table.integer('groups_id').references('id').inTable('groups').notNull().onDelete('CASCADE')
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_groups')
}
