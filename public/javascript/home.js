const enableCreate = () => {
  const timelineName = $('#new-timeline-name').val()
  const description = $('#textarea1').val()
  const button = $('.create-button')
  if (timelineName.length < 5 || description.length < 8) {
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
      if(timelineNameIsTaken) {
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
  html2canvas(document.querySelector("#capture"), {
    letterRendering: 1, allowTaint : true
    }).then(pic => {
      document.body.append(pic)
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
  window.location.href = 'http://localhost:3000/login'
}

//  AJAX POST NEW TIMELINE
const newTimeline = () => {
  const timelineName = $('#new-timeline-name').val()
  const description = $('#textarea1').val()
  $.ajax({
    url: '/home',
    type: 'POST',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      name: `${timelineName}`,
      description: `${description}`
    }),
    success: (data) => {
      console.log(data.message)
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

// DEFAULT DASHBOARD TIMELINE
const defaultTimeline = () => {
  const topTime = document.getElementsByClassName('active')
  const selectedImage = $(topTime).find('img.selected-image')
  const image = selectedImage[0].src
  $('.default-timeline-image').attr('src', `${image}`)
}



// DOCUMENT READY
$(document).ready(() => {
  $('.dropdown-trigger').dropdown()
  $('.carousel').carousel()
  $('.modal').modal()
  $('.chips').chips()
  defaultTimeline()


  //HOME MENU EVENT HANDLERS
  $('.logout').click(logout)

  // NEW TIMELINE EVENT HANDLERS
  $('#new-timeline-name').keyup(checkTimelineLength)
  $('#new-timeline-name').keyup(checkTimelineName)
  $('#new-timeline-name').keyup(enableCreate)
  $('#textarea1').keyup(checkDescriptionLength)
  $('#textarea1').keyup(enableCreate)
  // $('.group-emails').keyup(enterKey)
  $('.create-button').click(newTimeline)
  $('.create-button').click(clearForm)
  $('.cancel-button').click(clearForm)

  // CAROUSEL EVENT HANDLERS
  $('.next').click(nextButton)
  $('.prev').click(lastButton)
  $('.btn-small').click(numButton)

})
