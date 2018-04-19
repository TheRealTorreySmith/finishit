exports.up = (knex, Promise) => {
  return knex.schema.createTable('timelines', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.string('name', 255).notNull()
    table.text('description').notNull()
    table.boolean('zoomable').notNull().defaultTo(false)
    table.json('timeAxis').notNull().defaultTo(JSON.stringify({ scale: 'hour' }))
    table.json('orientation').notNull().defaultTo(JSON.stringify({ axis: 'top' }))
    table.string('height', 10).notNull().defaultTo('350px')
    table.string('min', 255).notNull().defaultTo('2018-04-19 00:00:00')
    table.string('max', 255).notNull().defaultTo('2018-04-26 00:00:00')
    table.string('zoomMax').notNull().defaultTo('5000000')
    table.boolean('editable').notNull().defaultTo(true)
    table.boolean('selectable').notNull().defaultTo(true)
    table.timestamps(true, true)
  })
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('timelines')
}
