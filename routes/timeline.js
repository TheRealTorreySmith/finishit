const express = require('express')
const router = express.Router()
const knex = require('../knex')

/* GET PROJECT PAGE */
const selectedTimeline = (req, res, next) => {
  res.render('timeline', { title: ' The Selected Timeline Page' })
}

const renderPage = (req, res, next) => {
  res.render('timeline', { title: ' The Default Timeline Page' })
}

const getTimelineData = (req, res, next) => {
  knex.from('timelines')
    .join('events', 'timelines.id', 'events.timeline_id')
    .select('*')
    .then((result) => {
      res.send(result)
    })
}


router.get('/', renderPage)
router.get('/default', getTimelineData)
router.get('/:id', selectedTimeline)

module.exports = router
