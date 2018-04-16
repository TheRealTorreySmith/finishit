const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const ev = require('express-validation')
// const validation = require('../validations/user')

/* GET LOGIN PAGE */
const login = (req, res, next) => {
  res.render('login-signup', {
    title: ' The Login Page'
  })
}

const getAllUsers = (req, res, next) => {
  return knex('users')
  .select('username', 'email')
  .then(result => {
    res.json(result)
  })
}

const isEmailValid = (req, res, next) => {
  knex('users')
    .select('email')
    .then(emailsInDB => {
      const allEmails = emailsInDB.map(x => x.email)
    if(req.body.email === undefined){
      res.type('text/plain')
      res.status(400).json({
        type: 'email-blank',
        message: 'Email must not be blank'
      })
      console.log('Email must not be blank')
    } else if (allEmails.includes(req.body.email)) {
      res.type('text/plain')
      res.status(400).json({
        type: 'email-taken',
        message: `${req.body.email} already exists. Please choose another or login with that email.`
      })
    } else {
      next()
    }
  })
}

const doesEmailExist = (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .then((results) => {
      if (results.length>0) {
        // Email exists already, create new ValidationError, pass to error handler with next()
        // The format of this Error object is specific so it matches the other validation errors from the Joi rules
        const errors = [
          {
            field: 'email',
            location: 'body',
            messages: ['Email already used, ya dingus.']
          }
        ]
      const evError = new ev.ValidationError(errors, { status: 400, statusText: 'Bad Request' })
      return next(evError)
    }
  })
}
//
// const isPasswordValid = (req, res, next) => {
//     if(req.body.password !== req.body.confirmPassword) {
//       res.type('text/plain')
//       res.status(400).send('"password" and "confirm-password" don\'t match.')
//     } else if(req.body.password === undefined){
//       res.type('text/plain')
//       res.status(400).send('Password must be at least 8 characters long')
//     } else {
//       next()
//     }
// }

const signup = (req, res, next) => {
  console.log(req.body)
  res.end()
  // res.redirect(`/home/${req.body.username}`)
}


router.get('/', login)
router.get('/users', getAllUsers)
router.post('/', isEmailValid, signup )

module.exports = router
