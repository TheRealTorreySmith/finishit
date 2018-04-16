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
  let passwordsMatch
  // WHEN USER FOCUSES OUT OF USERNAME INPUT,
  // CHECK DATABASE TO SEE IF USERNAME IS ALREADY TAKEN
  $('#username-signup').focusout((event) => {
    $.get('/login/users')
    .done(result => {
      const enteredUsername = $('#username-signup').val().toLowerCase()
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
      const enteredEmail = $('#email-signup').val().toLowerCase()
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
      passwordsMatch = false
    } else {
      $('.signup-form-password-error').empty()
      passwordsMatch = true
    }
  })

  // CREATE THE OBJECT THAT WILL ACT AS THE REQ.BODY
  const createRequest = () => {
    return {
    username: $('#username-signup').val(),
    email: $('#email-signup').val(),
    password: $('#password-signup').val()
  } }

    // Handle submit event
    $('#signup-submit-button').submit((event) => {
      event.preventDefault()
        // Make POST request with form field data as POST body
        if(passwordsMatch === true  && emailIsTaken === false && userNameIsTaken === false) {
          $.ajax({
            url: '/login',
            type: 'POST',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(createRequest()),
            success: (data) => {
              console.log('data success', data);
            },
            error: (err) => {
              console.log('err', err);
              }
          }) // end ajax
          } else {
           $('#general-error').text('Your input isn\'t quite correct.')
         }
        }) // end submit handler
}) // End document ready
