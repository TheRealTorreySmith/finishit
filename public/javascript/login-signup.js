$(document).ready(() => {
  // MAKE SIGNUP/LOGIN BUTTONS FUNCTIONAL.
  $('.collapsible').collapsible()
  if (window.location.hash === '#login-collapsible') {
    $('#login-collapsible').trigger('click')
  } else if (window.location.hash === '#signup-collapsible') {
    $('#signup-collapsible').trigger('click')
  }

  let userNameIsTaken
  let emailIsTaken
  // WHEN USER FOCUSES OUT OF USERNAME INPUT,
  // CHECK DATABASE TO SEE IF USERNAME IS ALREADY TAKEN
  $('#username-signup').focusout((event) => {
    $.get('/login/users')
    .done(result => {
      const enteredUsername = $('#username-signup').val()
      const usernames = result.map(x => x.username)
      userNameIsTaken = usernames.includes(enteredUsername) ? true : false
      if(userNameIsTaken) {
        $('.signup-form-username-error').empty()
        $('.signup-form-username-error').text(` Whoops. ${enteredUsername} already exists.`)
      } else {
        $('.signup-form-username-error').empty()
      }
    })
    .fail(err => console.log(err))
  })

  // WHEN USER FOCUSES OUT OF EMAIL INPUT,
  // CHECK DATABASE TO SEE IF EMAIL IS ALREADY TAKEN
  $('#email-signup').focusout((event) => {
    $.get('/login/users')
    .done(result => {
      const enteredEmail = $('#email-signup').val()
      const emails = result.map(x => x.email)
      emailIsTaken = emails.includes(enteredEmail) ? true : false
      if(emailIsTaken) {
        $('.signup-form-email-error').empty()
        $('.signup-form-email-error').text(` Whoops. ${enteredEmail} already exists.`)
      } else {
        $('.signup-form-email-error').empty()
      }
    })
    .fail(err => console.log(err))
  })


  // WHEN USER FOCUSES OUT OF CONFRIM PASSWORD INPUT,
  // CHECK DATABASE TO SEE IF EMAIL IS ALREADY TAKEN
  $('#confirm-password-signup').focusout((event) => {
    const firstPass =  $('#password-signup').val()
    const secondPass =  $('#confirm-password-signup').val()
    if(firstPass !== secondPass) {
      $('.signup-form-password-error').empty()
      $('.signup-form-password-error').text('Whoops, these passwords don\'t match.')
    } else {
      $('.signup-form-password-error').empty()
    }
  })


  // CREATE THE OBJECT THAT WILL ACT AS THE REQ.BODY
  const createRequest = () => {
    return {
    username: $('#username-signup').val(),
    email: $('#email-signup').val(),
    password: $('#password-signup').val(),
    confirmPassword: $('#confirm-password-signup').val()
  } }

  // Handle submit event
  $('#signup-submit-button').submit((event) => {
    event.preventDefault()
      // Make POST request with form field data as POST body
        $.ajax({
          url: '/login',
          type: 'POST',
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(createRequest()),
          success: (data) => {
            console.log('data success', data);
            // $('#exampleModalCenterBody').append(`<p>${data.message}</p>`)
          },
          error: (err) => {
            console.log('err', err);
            // $('.signup-error')
            // $('.signup-form-email-error').append(`${err.responseJSON.message}`)
            }
        }) // end ajax
  }) // end submit handler
}) // End document ready
