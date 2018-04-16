const express = require('express')
const router = express.Router()

/* GET LOGIN PAGE */
const login = (req, res, next) => {
  res.render('login-signup', { title: ' The Login Page' })
}


router.get('/', login)

module.exports = router
