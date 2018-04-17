const express = require('express')
const env = require('dotenv').config()

const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const KEY = process.env.JWT_KEY

const { validateBody, schemas } = require('../helpers/route-helpers')

/* GET LOGIN PAGE */
const login = (req, res, next) => {
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
      const token = jwt.sign({ username: req.body.signupUsername }, KEY)
      res.cookie('token', token, { httpOnly: true })
      res.status(200).json({ message: 'success' })
    })
}


router.get('/', login)
router.get('/users', getAllUsers)
router.post('/', validateBody(schemas.authSchema), addUser)

module.exports = router
