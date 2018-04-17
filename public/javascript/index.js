$(document).ready(() => {
  $('.parallax').parallax()
  const container = document.getElementById('visualization')

  // Create a DataSet (allows two way data-binding)
  const items = new vis.DataSet([
    {
      id: 1,
      content: 'Do Stuff',
      start: '2018-04-16',
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
    template: (item, element, data) => {
      return `<p>Title: ${item.content}<br>Start: ${data.start}<br>End: ${data.end}</p>`
    },
    margin: {
      item: 20,
      axis: 40
    }
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
  document.getElementById('toggleRollingMode').onclick = () => {
    timeline.toggleRollingMode()
  }

})
