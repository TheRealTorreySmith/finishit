exports.up = (knex, Promise) => {
  return knex.schema.createTable('timelines', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.string('name', 255).notNull()
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('timelines')
}
