exports.up = (knex, Promise) => {
  return knex.schema.createTable('timelines', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.string('users_id', 255).inTable('users').references('id').notNull()
    table.string('timelines_id', 255).inTable('timelines').references('id').notNull()
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('timelines')
}
