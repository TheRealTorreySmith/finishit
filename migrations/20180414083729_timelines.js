exports.up = (knex, Promise) => {
  return knex.schema.createTable('timelines', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.string('name', 255).notNull()
    table.text('description').notNull()
    table.boolean('zoomable').notNull().defaultTo(false)
    table.json('timeAxis').notNull().defaultTo(JSON.stringify({ scale: 'day' }))
    table.json('orientation').notNull().defaultTo(JSON.stringify({ axis: 'top' }))
    table.string('height', 10).notNull().defaultTo('400px')
    table.string('min', 255).notNull().defaultTo('now()')
    table.string('max', 255).notNull()
    table.string('zoomMax').notNull()
    table.boolean('editable').notNull().defaultTo(true)
    table.boolean('selectable').notNull().defaultTo(true)
    table.timestamps(true, true)
  })
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('timelines')
}
