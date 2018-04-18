const express = require('express')
const env = require('dotenv').config()

const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const KEY = process.env.JWT_KEY

const { validateBody, schemas } = require('../helpers/route-helpers')

/* GET LOGIN PAGE */
const start = (req, res, next) => {
  res.render('start', { title: ' Login / Signup' })
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

const loginUser = (req, res, next) => {
  knex('users')
    .where('username', req.body.loginUsername)
    .select('hashed_password')
    .then((result) => {
      const storedHash = result[0].hashed_password
      bcrypt.compare(req.body.loginPassword, storedHash, (err, passwordsMatch) => {
        if (passwordsMatch && req.cookies.token === undefined) {
          const token = jwt.sign({ username: req.body.loginUsername }, KEY)
          res.cookie('token', token, { httpOnly: true })
          res.status(200).json({ message: 'success' })
        } else if (passwordsMatch && req.cookies.token !== undefined) {
          res.status(200).json({ message: 'success' })
        } else {
          res.status(200).json({ message: 'fail' })
        }
      })
    })
}

router.get('/', start)
router.get('/users', getAllUsers)
router.post('/signup', validateBody(schemas.signup), addUser)
router.post('/login', validateBody(schemas.login), loginUser)


module.exports = router
