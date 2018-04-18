
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('timelines').del()
    .then(() => {
      // Inserts seed entries
      return knex('timelines').insert([
        {
          id: 1,
          name: 'Test Timeline',
          description: 'This is a working test for a timeline to display on the /timelines page',
          zoomable: true,
          timeAxis: JSON.stringify({ scale: 'day' }),
          orientation: JSON.stringify({ axis: 'bottom' })
        }
      ])
        .then(() => {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('timelines_id_seq', (SELECT MAX(id) FROM timelines))")
        })
    });
};
