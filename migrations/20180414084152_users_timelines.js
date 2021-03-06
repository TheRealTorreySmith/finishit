exports.up = (knex, Promise) => {
  return knex.schema.createTable('users_timelines', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.integer('users_id').references('id').inTable('users').notNull().onDelete('CASCADE')
    table.integer('timelines_id').references('id').inTable('timelines').notNull().onDelete('CASCADE')
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_timelines')
}
