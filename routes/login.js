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

// const isEmailValid = (req, res, next) => {
//   knex('users')
//     .select('email')
//     .then(emailsInDB => {
//       const allEmails = emailsInDB.map(x => x.email)
//     if(req.body.email === undefined){
//       res.type('text/plain')
//       res.status(400).json({
//         message: 'Email must not be blank'
//       })
//       console.log('Email must not be blank')
//     } else if (allEmails.includes(req.body.email)) {
//       res.type('text/plain')
//       res.status(400).json({
//         message: `${req.body.email} already exists. Please choose another or login with that email.`
//       })
//     } else {
//       next()
//     }
//   })
// }

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
}


router.get('/', login)
router.get('/users', getAllUsers)
router.post('/', signup)

module.exports = router
