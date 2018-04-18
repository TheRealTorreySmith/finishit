const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const KEY = process.env.JWT_KEY

const getCookie = (req, res, next) => {
  if (req.cookies.fstoken) {
    const payload = jwt.verify(req.cookies.fstoken, KEY)
    knex('users')
      .select('id')
      .where('username', payload.username)
      .then((result) => {
        res.json({ message: 'Success', payload, id: result[0].id })
      })
  } else {
    res.json({ message: 'Failed' })
  }
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'finishit' });
})

router.get('/cookie', getCookie)

module.exports = router;
