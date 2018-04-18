let userExists

const checkUsernameLogin = () => {
  return $.get('/start/users')
    .done((result) => {
      const enteredUsername = $('#username-login').val().toLowerCase()
      const usernames = result.map(x => x.username)
      userExists = usernames.includes(enteredUsername) ? true : false
      if (enteredUsername.length > 30) {
        $('.login-form-username-error').empty()
        $('.login-form-username-error').text(' All usernames are under 30 characters.')
      } else if (enteredUsername.length < 8) {
        $('.login-form-username-error').empty()
        $('.login-form-username-error').text(' All usernames are longer than 8 characters.')
      } else if (!userExists) {
        $('.login-form-username-error').empty()
        $('.login-form-username-error').text(` Whoops. ${enteredUsername} doesn't exist.`)
      } else {
        $('.login-form-username-error').empty()
      }
    })
    .fail(err => err)
}

// CREATE THE OBJECT THAT WILL ACT AS THE REQ.BODY
const createRequestLogin = () => {
  return {
    loginUsername: $('#username-login').val(),
    loginPassword: $('#password-login').val()
  }
}


$(document).ready(() => {
  // WHEN USER FOCUSES OUT OF USERNAME INPUT,
  // CHECK DATABASE TO SEE IF USERNAME EXISTS
  $('#username-login').focusout((event) => {
    checkUsernameLogin()
  })

  // Handle submit event
  $('#login-submit-button').click((event) => {
    event.preventDefault()
    // Make POST request with form field data as POST body
    if (userExists) {
      $('#general-login-error').empty()
      $.ajax({
        url: '/start/login',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(createRequestLogin()),
        success: (data) => {
          if (data.message === 'success') {
            window.location = 'http://localhost:3000/home'
          } else if (data.message === 'fail'){
            window.location = 'http://localhost:3000/start#login-collapsible'
            $('#general-login-error').empty()
            $('#general-login-error').text('Username and password don\'t match.')
          }
        }
      })
    } else {
      $('#general-login-error').empty()
      $('#general-login-error').text('Your input isn\'t quite correct.')
    }// end ajax
  }) // end submit handler
}) // End document ready
