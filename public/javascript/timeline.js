
const getTimeline = () => {
  $.get('/home/timeline/getTimeline')
    .done((result) => {
      // DOM element where the Timeline will be attached
      const container = document.getElementById('visual')
      // Create object of events needed to populate timeline
      const filteredData = result.filter(x => x.id === 1)
      const dataArr = []
      const optionsArr = []
      for (let i = 0; i < filteredData.length; i++) {
        dataArr.push({
          id: i,
          content: result[i].name,
          description: result[i].description,
          start: result[i].start,
          end: result[i].end
        })
      }
      // Create a DataSet (allows two way data-binding)
      const items = new vis.DataSet(dataArr)

      // Create an options object that gives customized options to timeline
      const options = {
        template: (item, element, data) => {
          return `<p class="vis-title">${item.content}</p><br><p>${item.description}</p>`
        },
        zoomable: result[0].zoomable,
        timeAxis: result[0].timeAxis,
        orientation: result[0].orientation
      }
      const timeline = new vis.Timeline(container, items, options)
    })
}

// CREATE THE OBJECT THAT WILL ACT AS THE REQ.BODY
const createNewEvent = () => {
  return {
    content: $('#new-event-name').val(),
    description: $('#new-event-description').val(),
    start: `${$('#new-event-start-date').val()} ${$('#new-event-start-time').val()}:00`,
    end: `${$('#new-event-end-date').val()} ${$('#new-event-end-time').val()}:00`
  }
}


// CREATE A POST REQUEST TO ADD EVENT TO DB
const postNewEvent = () => {
  $.ajax({
    url: '/home/timeline/newevent',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(createNewEvent()),
    success: (data) => {
      if (data.message === 'success') {
        console.log(data)
        window.location = `http://localhost:3000/home/timeline/${data.timelineId}`
      }
    }
  }) // end ajax
  // AFTER THE INFO HAS BEEN POSTED...
}

$(document).ready(() => {

  // ALLOW FOR MODAL FUNCTIONALITY
  $('.modal').modal()

  // DISPLAY TIMELINE ON THE PAGE
  getTimeline()

  // CREATE A NEW EVENT HANDLER
  $('#new-event-submit-button').click((event) => {
    event.preventDefault()
    postNewEvent()
  })

})
