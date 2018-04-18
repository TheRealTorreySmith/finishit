//  IMPORTS
const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const KEY = process.env.JWT_KEY

/* GET TIMELINE PAGE */
const selectedTimeline = (req, res, next) => {
  res.render('timeline', { title: ' The Selected Timeline Page' })
}

const renderPage = (req, res, next) => {
  res.render('timeline', { title: ' The Default Timeline Page' })
}



const getTimelineData = (req, res, next) => {
  const payload = jwt.verify(req.cookies.token, KEY)
  knex.from('timelines')
    .select('*')
    .join('events', 'timelines.id', 'events.timeline_id')
    .join('users_timelines', 'users_timelines.timelines_id', 'timelines.id')
    .join('users', 'users.id', 'users_timelines.users_id')
    .where('users.username', 'mitchl')
    .where('timelines.id', req.params.id)
    .then((result) => {
      res.send(result)
    })
}

//  ROUTE REQUESTS
router.get('/', renderPage)
router.get('/default', getTimelineData)
router.get('/:id', selectedTimeline)

//  EXPORTS
module.exports = router
