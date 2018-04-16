const express = require('express')
const router = express.Router()

/* GET PROJECT PAGE */
const selectedTimeline = (req, res, next) => {
  res.render('timeline', { title: ' The Selected Timeline Page' })
}

const defaultTimeline = (req, res, next) => {
  res.render('timeline', { title: ' The Default Timeline Page' })
}


router.get('/', defaultTimeline)
router.get('/:id', selectedTimeline)

module.exports = router
