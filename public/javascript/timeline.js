let eventNameIsTaken = true
let eventTimeIsValid = false


// GET ALL EVENT NAMES THAT ARE ASSOCIATED WITH THIS TIMELINE
const getEventNames = () => {
  return $.get('/home/timeline/getEventNames')
    .done((result) => {
      const enteredEventName = $('#new-event-name').val().toLowerCase().trim()
      const eventNames = result.map(x => x.content.toLowerCase())
      eventNameIsTaken = eventNames.includes(enteredEventName) ? true : false
      if (eventNameIsTaken) {
        $('.new-event-form-name-error').empty()
        $('.new-event-form-name-error').text(` Whoops. "${enteredEventName}" already exists.`)
      } else {
        $('.new-event-form-name-error').empty()
      }
    })
    .fail(err => err)
}

const checkEventStart = () => {
  return $.get('/home/timeline/getTimelineStartEnd')
    .done((result) => {

    ////////////////// EVENT ****START*** DATE / TIME /////////////////////////

      // START
      // ENTERED START DATE AND TIME
      const enteredStartDate = $('#new-event-start-date').val().trim()
      const enteredStartYear = enteredStartDate.slice(0, 4)
      const enteredStartMonth = enteredStartDate.slice(5, 7)
      const enteredStartDay = enteredStartDate.slice(8, 10)

      // START
      // CURRENT TIMELINE START DATE AND TIME
      const currentTimelineStartYear = result.currentTimelineStart.slice(0, 4)
      const currentTimelineStartMonth = result.currentTimelineStart.slice(5, 7)
      const currentTimelineStartDay = result.currentTimelineStart.slice(8, 10)
      // END
      // CURRENT TIMELINE END DATE AND TIME
      const currentTimelineEndYear = result.currentTimelineEnd.slice(0, 4)
      const currentTimelineEndMonth = result.currentTimelineEnd.slice(5, 7)
      const currentTimelineEndDay = result.currentTimelineEnd.slice(8, 10)

      // START
      // CHECK IF THE ENTERED DATE IS INSIDE OF THE SCOPE OF THE TIMLINE
      if ( (enteredStartYear >= currentTimelineStartYear && enteredStartYear <= currentTimelineEndYear) === false ||
        (eventTimeIsValid = enteredStartMonth >= currentTimelineStartMonth && enteredStartMonth <= currentTimelineEndMonth) === false ||
        (eventTimeIsValid = enteredStartDay >= currentTimelineStartDay && enteredStartDay < currentTimelineEndDay) === false
      ) {
        eventTimeIsValid = false
      } else {
        eventTimeIsValid = true
      }

      // START
      // IF THE USER HAS ENTERED A DATE THAT IS OUTSIDE OF THE SCOPE, PRESENT AN ERROR
      if (!eventTimeIsValid) {
        $('.new-event-form-name-error').empty()
        $('.new-event-form-name-error').text(` Whoops. "${enteredStartDate}" is outside of your timeline scope.`)
      } else {
        $('.new-event-form-name-error').empty()
      }




    }) // END AJAX CALL
    .fail(err => err)
}



const checkEventEnd = () => {
  return $.get('/home/timeline/getTimelineStartEnd')
    .done((result) => {

      ////////////////// EVENT END DATE / TIME ////////////////////////////

      // START
      // CURRENT TIMELINE START DATE AND TIME
      const currentTimelineStartYear = result.currentTimelineStart.slice(0, 4)
      const currentTimelineStartMonth = result.currentTimelineStart.slice(5, 7)
      const currentTimelineStartDay = result.currentTimelineStart.slice(8, 10)


      // END
      // CURRENT TIMELINE END DATE AND TIME
      const currentTimelineEndYear = result.currentTimelineEnd.slice(0, 4)
      const currentTimelineEndMonth = result.currentTimelineEnd.slice(5, 7)
      const currentTimelineEndDay = result.currentTimelineEnd.slice(8, 10)

      // END
      // ENTERED END DATE AND TIME
      const enteredEndDate = $('#new-event-end-date').val().trim()
      const enteredEndYear = enteredEndDate.slice(0, 4)
      const enteredEndMonth = enteredEndDate.slice(5, 7)
      const enteredEndDay = enteredEndDate.slice(8, 10)

      // END
      // CHECK IF THE ENTERED DATE IS INSIDE OF THE SCOPE OF THE TIMLINE
      if ( (enteredEndYear <= currentTimelineEndYear && enteredEndYear >= currentTimelineStartYear) === false ||
           (enteredEndMonth <= currentTimelineEndMonth && enteredEndMonth >= currentTimelineStartMonth) === false ||
           (enteredEndDay < currentTimelineEndDay && enteredEndDay >= currentTimelineStartDay) === false)
      {
       eventTimeIsValid = false
      } else {
      eventTimeIsValid = true
      }

      // END
      // IF THE USER HAS ENTERED A DATE THAT IS OUTSIDE OF THE SCOPE, PRESENT AN ERROR
      if (!eventTimeIsValid) {
        $('.new-event-form-name-error').empty()
        $('.new-event-form-name-error').text(` Whoops. "${enteredEndDate}" is outside of your timeline scope.`)
      } else {
        $('.new-event-form-name-error').empty()
      }


    }) // END AJAX CALL
    .fail(err => err)
}


const getTimeline = () => {
  $.get('/home/timeline/getTimeline')
    .done((result) => {
      console.log(result)
      // DOM element where the Timeline will be attached
      const container = document.getElementById('visual')
      // Create object of events needed to populate timeline
      // const filteredData = result.filter(x => x.id === 1)
      const dataArr = []
      const optionsArr = []
      for (let i = 1; i < result.length; i++) {
        dataArr.push({
          id: i,
          content: result[i].content,
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
        // editable: result[0].editable,
        editable: true,
        selectable: true,
        zoomable: result[0].zoomable,
        timeAxis: result[0].timeAxis,
        orientation: result[0].orientation,
        min: result[0].min,
        max: result[0].max,
        zoomMax: parseInt(result[0].zoomMax),
        onRemove: (item, callback) => {
          console.log(item)
          $.ajax({
            url: '/home/timeline/deleteevent',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ content: item.content, id: result[0].timeline_id }),
            success: (data) => {
              if (data.message === 'success') {
                callback(item)
              }
            }
          })
        }
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
        window.location = `/home/timeline/${data.timelineId}`
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

  // WHEN USER FOCUSES OUT OF EVENT NAME INPUT,
  // CHECK DATABASE TO SEE IF EVENT NAME IS ALREADY TAKEN
  $('#new-event-name').focusout((event) => {
    getEventNames()
  })

  // WHEN USER FOCUSES OUT OF EVENT NAME INPUT,
  // CHECK DATABASE TO SEE IF EVENT NAME IS ALREADY TAKEN
  $('#new-event-start-date').focusout((event) => {
    checkEventStart()
  })

  $('#new-event-end-date').focusout((event) => {
    checkEventEnd()
  })

  // CREATE A NEW EVENT HANDLER
  $('#new-event-submit-button').click((event) => {
    event.preventDefault()
    if (eventNameIsTaken === false && eventTimeIsValid === true) {
      postNewEvent()
    } else {
      $('#general-new-event-error').empty()
      $('#general-new-event-error').text('Your input isn\'t quite correct.')
    }
  })

  $('#visual').on('click', (event) => {
    if (event.target.getAttribute('class') === 'vis-item-content') {
      $('#event-description')[0].innerText = (event.target.innerText.split('\n')[3])
      $('#event-description-button').trigger('click')
    }
  })

})
