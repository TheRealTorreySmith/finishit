$(document).ready(() => {
  $('.parallax').parallax()
  const container = document.getElementById('visualization');

  // Create a DataSet (allows two way data-binding)
  const items = new vis.DataSet([
    { id: 1, content: 'Do Stuff', start: '2018-04-10', end: '2018-04-20' },
    { id: 2, content: 'item 2', start: '2018-04-14' },
    { id: 3, content: 'item 3', start: '2018-04-18' },
    { id: 4, content: 'item 4', start: '2018-04-16', end: '2018-04-19' },
    { id: 5, content: 'item 5', start: '2018-04-25' },
    { id: 6, content: 'item 6', start: '2018-04-27' }
  ])

  const options = {}

  // Create a Timeline
  const timeline = new vis.Timeline(container, items, options);
})
