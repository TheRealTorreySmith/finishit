const createDefaultTimeline = () => {
  // Get DOM container for visualization engine
  const container = document.getElementById('visualization')

  // Create a DataSet (allows two way data-binding)
  const items = new vis.DataSet([
    {
      id: 1,
      content: 'Do Stuff',
      description: 'I need to do a bunch of stuff',
      start: '2018-04-20',
      end: '2018-04-20'
    },
    {
      id: 2,
      content: 'File Taxes',
      start: '2018-04-18',
      end: '2018-04-18'
    },
    {
      id: 3,
      content: 'Write Novel',
      start: '2018-04-19',
      end: '2018-04-19'
    },
    {
      id: 4,
      content: 'Bathe Dog',
      start: '2018-04-22',
      end: '2018-04-22'
    },
    {
      id: 5,
      content: 'Bathe Ostrich',
      start: '2018-04-22 00:00:00',
      end: '2018-04-22 12:00:00'
    }

  ])

  // Create options for visualization engine
  const options = {
    template: (item, element, data) => {
      return `<p class="vis-title">${item.content}</p><br><p>${item.description}</p>`
    },
    zoomable: false,
    timeAxis: { scale: 'day' },
    height: '400px',
    orientation: { axis: 'top' },
    verticalScroll: true,
    min: '2018-04-23 00:00:00',
    max: '2018-05-23 00:00:00',
    zoomMax: 50000000000
  }

  // Create a Timeline with visualization engine
  const timeline = new vis.Timeline(container, items, options)

  // Functions for interactive buttons on timeline
  const move = (percentage) => {
    var range = timeline.getWindow();
    var interval = range.end - range.start;

    timeline.setWindow({
      start: range.start.valueOf() - (interval * percentage),
      end: range.end.valueOf() - (interval * percentage)
    });
  }

  document.getElementById('zoomIn').onclick = () => {
    timeline.zoomIn(0.2)
  }
  document.getElementById('zoomOut').onclick = () => {
    timeline.zoomOut(0.2)
  }
  document.getElementById('moveLeft').onclick = () => {
    move(.5)
  }
  document.getElementById('moveRight').onclick = () => {
    move(-.5)
  }
}

const getCookieInfo = () => {
  $.get('/cookie')
    .done((result) => {
      // console.log(result.message)
      if (result.message === 'Success') {
        window.location = `http://localhost:3000/home/${result.id}`
      }
    })
}

getCookieInfo()

$(document).ready(() => {
  $('.parallax').parallax()
  createDefaultTimeline()

})
