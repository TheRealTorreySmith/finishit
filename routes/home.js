const express = require('express')
const router = express.Router()

/* GET DASHBOARD PAGE */
const dash = (req, res, next) => {
  res.render('home', { title: ' The Home Page' })
}


router.get('/', dash)

module.exports = router
