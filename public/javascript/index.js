const createDefaultTimeline = () => {
  // Get DOM container for visualization engine
  const container = document.getElementById('visualization')

  // Create a DataSet (allows two way data-binding)
  const items = new vis.DataSet([
    {
      id: 1,
      content: 'Get ready for work',
      description: 'Don\'t forget to brush your teeth',
      start: '2018-04-21 07:00:00',
      end: '2018-04-21 08:00:00'
    },
    {
      id: 2,
      content: 'Drive to work',
      description: 'Shut up and drive',
      start: '2018-04-21 08:00:00',
      end: '2018-04-21 09:00:00'
    },
    {
      id: 3,
      content: 'Code',
      description: 'Clickity clack',
      start: '2018-04-21 08:30:00',
      end: '2018-04-21 10:00:00'
    },
    {
      id: 4,
      content: 'Other code',
      description: 'Clackity click',
      start: '2018-04-21 09:00:00',
      end: '2018-04-21 12:00:00'
    },
    {
      id: 5,
      content: 'Goof off',
      description: 'Time flies when you\'re having fun',
      start: '2018-04-21 12:00:00',
      end: '2018-04-21 16:30:00'
    }

  ])

  // Create options for visualization engine
  const options = {
    template: (item, element, data) => {
      return `<p class="vis-title">${item.content}</p><br><p>${item.description}</p>`
    },
    zoomable: false,
    timeAxis: { scale: 'hour' },
    height: '400px',
    orientation: { axis: 'top' },
    verticalScroll: true,
    min: '2018-04-21 00:00:00',
    max: '2018-04-22 00:00:00',
    zoomMax: 50000000
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
        window.location = '/home'
      }
    })
}

getCookieInfo()

$(document).ready(() => {
  $('.parallax').parallax()
  createDefaultTimeline()

})
