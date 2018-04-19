exports.up = (knex, Promise) => {
  return knex.schema.createTable('events', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.integer('timeline_id').references('id').inTable('timelines').onDelete('CASCADE')
    table.string('content', 255).notNull().defaultTo('')
    table.string('description', 255).notNull().defaultTo('')
    table.string('start').notNull().defaultTo(knex.raw('now()'))
    table.string('end').defaultTo('2018-04-20')
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events')
}
