exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments().primary()
    table.string('username', 255).notNull().defaultTo('')
    table.string('email', 255).notNull().unique()
    table.specificType('hashed_password', 'char(60)').notNull()
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
