exports.up = (knex, Promise) => {
  return knex.schema.createTable('groups', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.string('name', 255).notNull().defaultTo('')
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('groups')
}
