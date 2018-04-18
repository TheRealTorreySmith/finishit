
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users_timelines').del()
    .then(() => {
      // Inserts seed entries
      return knex('users_timelines').insert([
        {
          id: 1,
          users_id: 1,
          timelines_id: 1
        }
      ])
        .then(() => {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('users_timelines_id_seq', (SELECT MAX(id) FROM users_timelines))")
        })
    });
};
