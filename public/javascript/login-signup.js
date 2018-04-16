let userNameIsTaken = true
let emailIsTaken = true
let passwordsMatch = false

const checkSignup = () => {
  return $.get('/login/users')
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
  .fail(err => err)
}

const checkEmail = () => {
  return $.get('/login/users')
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
  .fail(err => err)
}


const checkPasswords = () => {
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
}

// CREATE THE OBJECT THAT WILL ACT AS THE REQ.BODY
const createRequest = () => {
  return {
  username: $('#username-signup').val(),
  email: $('#email-signup').val(),
  password: $('#password-signup').val()
} }


$(document).ready(() => {
  // MAKE SIGNUP/LOGIN BUTTONS FUNCTIONAL.
  $('.collapsible').collapsible()
  if (window.location.hash === '#login-collapsible') {
    $('#login-collapsible').trigger('click')
  } else if (window.location.hash === '#signup-collapsible') {
    $('#signup-collapsible').trigger('click')
  }

  // WHEN USER FOCUSES OUT OF USERNAME INPUT,
  // CHECK DATABASE TO SEE IF USERNAME IS ALREADY TAKEN
  $('#username-signup').focusout((event) => {
      checkSignup()
  })

  // WHEN USER FOCUSES OUT OF EMAIL INPUT,
  // CHECK DATABASE TO SEE IF EMAIL IS ALREADY TAKEN
  $('#email-signup').focusout((event) => {
      checkEmail()
  })


  // WHEN USER FOCUSES OUT OF CONFRIM PASSWORD INPUT,
  // CHECK DATABASE TO SEE IF EMAIL IS ALREADY TAKEN
  $('#confirm-password-signup').focusout((event) => {
      checkPasswords()
  })


    // Handle submit event
    $('#signup-submit-button').click((event) => {
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
              return data
            }
          }) // end ajax
        } else {
           $('#general-error').text('Your input isn\'t quite correct.')
         }
    }) // end submit handler
}) // End document ready
