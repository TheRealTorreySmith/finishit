
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
          timeAxis: JSON.stringify({ scale: 'hour' }),
          orientation: JSON.stringify({ axis: 'bottom' }),
          min: '2018-04-19 00:00:00',
          max: '2018-04-20 00:00:00',
          zoomMax: 50000000
        }
      ])
        .then(() => {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('timelines_id_seq', (SELECT MAX(id) FROM timelines))")
        })
    });
};
