$(document).ready(() => {
  $('.parallax').parallax()
  const container = document.getElementById('visualization')

  // Create a DataSet (allows two way data-binding)
  const items = new vis.DataSet([
    {
      id: 1,
      content: 'Do Stuff',
      description: 'I need to do a bunch of stuff',
      start: '2018-04-16',
      end: '2018-04-20'
    },
    {
      id: 2,
      content: 'File Taxes',
      start: '2018-04-16',
      end: '2018-04-18'
    },
    {
      id: 3,
      content: 'Write Novel',
      start: '2018-04-18',
      end: '2018-04-19'
    },
    {
      id: 4,
      content: 'Bathe Dog',
      start: '2018-04-14',
      end: '2018-04-22'
    },
    {
      id: 5,
      content: 'Bathe Ostrich',
      start: '2018-04-20',
      end: '2018-04-22'
    }

  ])

  const options = {
    template: (item, element, data) => {
      return `<p class="vis-title">${item.content}</p><br><p>${item.description}</p>`
    },
    zoomable: false,
    timeAxis: { scale: 'day' },
    height: '400px',
    orientation: { axis: 'top' },
    verticalScroll: true,
  }

  // Create a Timeline
  const timeline = new vis.Timeline(container, items, options)

  const move = (percentage) => {
    var range = timeline.getWindow();
    var interval = range.end - range.start;

    timeline.setWindow({
      start: range.start.valueOf() - (interval * percentage),
      end: range.end.valueOf() - (interval * percentage)
    });
  }

  // attach events to the navigation buttons
  document.getElementById('zoomIn').onclick = () => {
    timeline.zoomIn(0.2)
  }
  document.getElementById('zoomOut').onclick = () => {
    timeline.zoomOut(0.2)
  }
  document.getElementById('moveLeft').onclick = () => {
    move(0.2)
  }
  document.getElementById('moveRight').onclick = () => {
    move(-0.2)
  }

})
