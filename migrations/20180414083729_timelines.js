exports.up = (knex, Promise) => {
  return knex.schema.createTable('timelines', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.string('name', 255).notNull()
    table.text('description').notNull()
    table.boolean('editable').notNull().defaultTo(true)
    table.boolean('selectable').notNull().defaultTo(true)
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('timelines')
}
