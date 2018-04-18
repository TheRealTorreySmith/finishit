

//REDIRECTS USER BACK TO THE HOME PAGE
const homeFunc = () => {
  window.location.href = 'http://localhost:3000/home'
}


$(document).ready(() => {
  //CLICK EVENT HANDLER FOR HOME REDIRECT
  $('.home').click(homeFunc)
  // DOM element where the Timeline will be attached
  const container = document.getElementById('visual')

  // Create a DataSet (allows two way data-binding)
  const items = new vis.DataSet([
    { id: 1, content: 'item 1', start: '2013-04-20' },
    { id: 2, content: 'item 2', start: '2013-04-14' },
    { id: 3, content: 'item 3', start: '2013-04-18' },
    { id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19' },
    { id: 5, content: 'item 5', start: '2013-04-25' },
    { id: 6, content: 'item 6', start: '2013-04-27' }
  ])

  // Configuration for the Timeline
  const options = {
    editable: true,
    selectable: true
  }

  // Create a Timeline
  const timeline = new vis.Timeline(container, items, options)
})
