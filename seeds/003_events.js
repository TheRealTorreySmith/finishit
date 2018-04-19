
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
          start: '2018-04-19 08:30:00',
          end: '2018-04-19 16:30:00'
        },
        {
          id: 2,
          timeline_id: 1,
          content: 'Bathe Cat',
          description: 'I need to bathe the cat',
          start: '2018-04-19 10:30:00',
          end: '2018-04-19 14:30:00'
        }
      ])
        .then(() => {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events))")
        })
    });
};
