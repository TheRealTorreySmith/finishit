//  IMPORTS
const express = require('express')

const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const KEY = process.env.JWT_KEY

let currentSelectedTimelineId
let currentTimelineStart
let currentTimelineEnd

/* GET TIMELINE PAGE */
const selectedTimelinePage = (req, res, next) => {
  currentSelectedTimelineId = req.params.id
  knex.from('timelines')
    .join('users_timelines', 'users_timelines.timelines_id', 'timelines.id')
    .join('users', 'users_timelines.users_id', 'users.id')
    .where('users_timelines.timelines_id', req.params.id)
    .returning(['name', 'timeAxis', 'description'])
    .then((result) => {
      currentTimelineStart = result[0].min
      currentTimelineEnd = result[0].max
      const selectedDuration = result[0].timeAxis.scale
      const timelineName = result[0].name
      const timelineDescription = result[0].description
      // console.log(result)
      res.render('timeline', {
        title: ' The Selected Timeline Page',
        selectedDuration,
        timelineName,
        timelineDescription
      })
    })
}

const getTimelineData = (req, res, next) => {
  const payload = jwt.verify(req.cookies.fstoken, KEY)
  knex.from('timelines')
    .select('*')
    .join('events', 'timelines.id', 'events.timeline_id')
    .join('users_timelines', 'users_timelines.timelines_id', 'timelines.id')
    .join('users', 'users.id', 'users_timelines.users_id')
    .where('users.username', payload.username)
    .where('timelines.id', currentSelectedTimelineId)
    .where('events.timeline_id', currentSelectedTimelineId)
    .then((result) => {
      res.send(result)
    })
}

const createNewEvent = (req, res, next) => {
  const { content, description, start, end } = req.body
  knex('events')
    .where('timeline_id', currentSelectedTimelineId)
    .insert({
      timeline_id: currentSelectedTimelineId,
      content,
      description,
      start,
      end })
    .then(() => {
      res.json({
        message: 'success',
        timelineId: currentSelectedTimelineId
      })
    })
}

const deleteEvent = (req, res, next) => {
  const { id, content } = req.body
  knex('events')
    .where('events.content', content)
    .where('events.timeline_id', id)
    .del()
    .then(() => {
      res.json({
        message: 'success'
      })
    })
}

const getEventNames = (req, res, next) => {
  return knex('events')
    .select('content')
    .where('timeline_id', currentSelectedTimelineId)
    .then((result) => {
      console.log(result)
      res.json(result)
    })
}

const getTimelineStartEnd = (req, res, next) => {
  res.json({ currentTimelineStart, currentTimelineEnd })
}


// ROUTE REQUESTS
router.get('/getTimeline', getTimelineData)
router.get('/getEventNames', getEventNames)
router.get('/getTimelineStartEnd', getTimelineStartEnd)
router.get('/:id', selectedTimelinePage)
router.post('/newevent', createNewEvent)
router.post('/deleteevent', deleteEvent)

// EXPORTS
module.exports = router
