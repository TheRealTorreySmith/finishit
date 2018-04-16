$(document).ready(() => {
  $('.parallax').parallax()
  const container = document.getElementById('visualization')

  // Create a DataSet (allows two way data-binding)
  const items = new vis.DataSet([
    {
      id: 1,
      content: 'Do Stuff',
      start: '2018-04-10',
      end: '2018-04-20'
    },
    {
      id: 2,
      content: 'File Taxes',
      start: '2018-04-16',
      end: '2018-04-18'
    }

  ])

  const options = {
    configure: true,
    editable: true,
    selectable: true
  }

  // Create a Timeline
  const timeline = new vis.Timeline(container, items, options)
})
//
// $('#login').on('click', (event) => {
//
// })
