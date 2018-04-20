const enableCreate = () => {
  const timelineName = $('#new-timeline-name').val()
  const description = $('#textarea1').val()
  const button = $('.create-button')
  const startDate = $('#start-date').val()
  if (timelineName.length < 5 || description.length < 8 || startDate === '') {
    button.attr('disabled', true)
  } else {
    button.removeAttr('disabled')
  }
}

//  CHECKS THE LENGTH OF THE TIMELINE NAME
const checkTimelineLength = () => {
  const timelineName = $('#new-timeline-name').val()
  if (timelineName.length < 5) {
    if ($('#timeline-name-length-error')[0].textContent === '') {
      $('#timeline-name-length-error').append('Whoops. The timeline name must be at least 5 characters long.')
    }
  } else {
    $('#timeline-name-length-error').empty()
  }
}

//  CHECKS TIMELINE NAME
const checkTimelineName = () => {
  return $.get('/home/names')
    .done((result) => {
      const timelineName = $('#new-timeline-name').val()
      const names = result.map(x => x.name)
      timelineNameIsTaken = names.includes(timelineName) ? true : false
      if (timelineNameIsTaken) {
        if ($('#timeline-name-error')[0].textContent === '') {
          $('#timeline-name-error').append(` Whoops. ${timelineName} already exists.`)
        }
      } else {
        $('#timeline-name-error').empty()
      }
    })
    .fail(err => err)
}

//  CHECKS THE LENGTH OF THE DESCRIPTION
const checkDescriptionLength = () => {
  const description = $('#textarea1').val()
  if (description.length < 8) {
    if ($('#description-error')[0].textContent === '') {
      $('#description-error').append(' Whoops. The description must be at least 8 characters long.')
    }
  } else {
    $('#description-error').empty()
  }
}

//  CHECKS EMAIL OF GROUP MEMBERS
// const enterKey = () => {
//     return $.get('/timeline/emails')
//     .done(result => {
//       const timelineName = $('#new-timeline-name').val()
//       const description = $('#textarea1').val()
//       const userEmail = $('.group-emails').val()
//       const emails = result.map(x => x.email)
//       emailExists = emails.includes(userEmail) ? true : false
//   if(userEmail.length !== 0 || !emailExists || timelineName.length < 5 || description.length < 8) {
//     // $('.create-button').attr('disabled',true)
//   } else {
//       // $('.create-button').attr('disabled',false)
//     }
//   })
// }

//  SCROLLS CAROUSEL TO THE NEXT
const nextButton = () => {
  $('.carousel').carousel('next')
}

//  CAPTURES A SCREENSHOT FOR ELEMENT WITH ID 'CAPTURE'
const screenCap = () => {
  html2canvas(document.querySelector('.vis-timeline'), {
    letterRendering: 1, windowHeight: 200, windowWidth: 200
  }).then((pic) => {
    $('#capture').append(pic)
  })
}

//  SCROLLS CAROUSEL TO THE PREVIOUS
const lastButton = () => {
  $('.carousel').carousel('prev')
}
//  SCROLLS CAROUSEL TO THE NUMBER SELECTED
const numButton = (event) => {
  const num = $(event.target)[0].innerHTML
  $('.carousel').carousel('set', num)
}

//  REDIRECTS USER TO LOGIN PAGE
const logout = () => {
  window.location.href = '/login'
}

//  GET TIMELINE ID
const checkTimelineId = () => {
  return $.get('/home/timeline/id')
    .done((result) => {
      const num = result.length - 1
      window.location.href = `/home/timeline/${result[num].id}`
    })
    .fail(err => err)
}

//  AJAX POST NEW TIMELINE
const newTimeline = () => {
  const timelineName = $('#new-timeline-name').val()
  const description = $('#textarea1').val()
  const min = $('#start-date').val()
  let arr = $("input[name='group1']" ).toArray()
  const checkedValue = arr.filter(x => x.checked)[0].defaultValue.toLowerCase()
  $.ajax({
    url: '/home',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      name: `${timelineName}`,
      description: `${description}`,
      timeAxis: `${checkedValue}`,
      min: `${min}`
    }),
    success: (data) => {
      checkTimelineId()
    }
  })
}

//  CLEARS THE FORM ON CLEAR AND SUBMISSION
const clearForm = () => {
  $('#new-timeline-name').val('')
  $('#textarea1').val('')
  $('.group-emails').val('')
  $('.chip').remove()
  $('#timeline-name-length-error').empty()
  $('#timeline-name-error').empty()
  $('#description-error').empty()
}


// AJAX CALL TO GET USER COOKIE AND POPULATE PAGE WITH TIMELINES
const createTimeline = () => {
  $.get('/home/create-timeline')
    .done((result) => {
      if (result === 'No token') {
        window.location = '/start'
      }

      // DOM element where the Timeline will be attached
      const container = document.getElementById('dash-vis')
      // Create object of events needed to populate timeline
      // const filteredData = result.filter(x => x.id === 1)
      const dataArr = []
      const optionsArr = []
      for (let i = 0; i < result.length; i++) {
        dataArr.push({
          id: i,
          content: result[i]['event.name'],
          description: result[i]['event.description'],
          start: result[i]['event.start'],
          end: result[i]['event.end']
        })
      }
      // Create a DataSet (allows two way data-binding)
      const items = new vis.DataSet(dataArr)

      // Create an options object that gives customized options to timeline
      const options = {
        template: (item, element, data) => {
          return `<p class="vis-title">${item.content}</p><br><p>${item.description}</p>`
        },
        zoomable: false,
        timeAxis: result[0]['timeline.axis'],
        orientation: result[0]['timeline.orientation'],
        height: '350px',
        zoomMax: parseInt(result[0].zoom),
        min: result[0].min,
        max: result[0].max
      }
      const timeline = new vis.Timeline(container, items, options)

    })
}

//  DELETES ITEM IN CAROUSEL ON DELETE YES CLICK
const deleteTimeline = () => {
  const carouselTimeline = document.getElementsByClassName('active')
  $(carouselTimeline).empty()
  const smallbtns = document.getElementsByClassName('btn-small')

  // $(biggestBtn).empty()

for (var i = 0; i < smallbtns.length; i++) {
  //console.log(smallbtns[i].textContent)
  if (smallbtns[i].textContent == smallbtns.length) {
    smallbtns[i].remove()
  }
}
 }

// DOCUMENT READY
$(document).ready(() => {
  $('.dropdown-trigger').dropdown()
  $('.carousel').carousel()
  $('.modal').modal()
  $('.chips').chips()

  // HOME MENU EVENT HANDLERS
  $('.logout').click(logout)

  // NEW TIMELINE EVENT HANDLERS
  $('#new-timeline-name').keyup(checkTimelineLength)
  $('#new-timeline-name').keyup(checkTimelineName)
  $('#textarea1').keyup(checkDescriptionLength)
  $('#start-date').change(enableCreate)
  // $('.group-emails').keyup(enterKey)
  $('.create-button').click(newTimeline)
  $('.create-button').click(clearForm)
  $('.cancel-button').click(clearForm)

  // CAROUSEL EVENT HANDLERS
  $('.next').click(nextButton)
  $('.prev').click(lastButton)
  $('.btn-small').click(numButton)
  $('#yes-delete').click(deleteTimeline)

  // COOKIE EVENT HANDLER
  createTimeline()
  setTimeout(() => {
    screenCap()
  }, 1500)
})
