
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(() => {
      // Inserts seed entries
      return knex('events').insert([
        {
          id: 1,
          timeline_id: 1,
          content: 'Bathe Dog',
          description: 'I need to bathe the dog',
          end: '2018-04-20'
        },
        {
          id: 2,
          timeline_id: 1,
          content: 'Bathe Cat',
          description: 'I need to bathe the cat',
          end: '2018-04-20'
        }
      ])
        .then(() => {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events))")
        })
    });
};
