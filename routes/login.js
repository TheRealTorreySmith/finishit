const express = require('express')

const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')

const { validateBody, schemas } = require('../helpers/route-helpers')

/* GET LOGIN PAGE */
const login = (req, res, next) => {
  const errors = req.validationErrors()
  res.render('login-signup', { title: ' The Login Page' })
}

const getAllUsers = (req, res, next) => {
  return knex('users')
    .select('username', 'email')
    .then((result) => {
      res.json(result)
    })
}


const addUser = (req, res, next) => {
  const saltRounds = 10
  const plaintextPassword = req.body.signupPassword
  const hashedPass = bcrypt.hashSync(plaintextPassword, saltRounds)
  knex('users')
    .insert({
      username: req.body.signupUsername,
      email: req.body.signupEmail,
      hashed_password: hashedPass
    })
    .then(() => {
      res.status(200).redirect('/home')
    })
}


router.get('/', login)
router.get('/users', getAllUsers)
router.post('/', validateBody(schemas.authSchema), addUser)

module.exports = router
