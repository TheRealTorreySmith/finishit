const express = require('express')

const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const KEY = process.env.JWT_KEY

/* GET DASHBOARD PAGE */
const dash = (req, res, next) => {
  if (req.cookies.fstoken) {
    const payload = jwt.verify(req.cookies.fstoken, KEY)
    knex('users')
    // .select(['timelines.created_at AS timeline.created', 'timelines.description AS timeline.description', 'timelines.updated_at AS timeline.updated', 'timelines.name AS timeline.name', 'timelines.orientation AS timeline.orientation', 'timelines.timeAxis AS timeline.axis', 'events.content AS event.name', 'events.description AS event.description', 'events.start AS event.start', 'events.end AS event.end', 'timelines.zoomMax AS zoom', 'timelines.min AS min', 'timelines.max AS max'])
    // .select('*')
      .join('users_timelines', 'users_timelines.users_id', 'users.id')
      .join('timelines', 'timelines.id', 'users_timelines.timelines_id')
      .join('events', 'events.timeline_id', 'timelines.id')
      .where('users.username', payload.username)
      .then((result) => {
        if (result.length < 1) {
          res.render('home', { title: 'Dashboard', username: payload.username, confirm: 'No' })
        } else {
          res.render('home', { title: 'Dashboard', username: payload.username, confirm: 'Yes' })
        }
      })
  } else {
    res.redirect('/start')
  }
}

// QUERY DATABASE FOR ALL USER EMAILS
const getUserEmails = (req, res, next) => {
  knex('users')
    .select('*')
    .then((userEmails) => {
      res.json(userEmails)
    })
}

//  QUERY DATABASE FOR ALL TIMELINE NAMES
const getTimelineNames = (req, res, next) => {
  knex('timelines')
    .select('*')
    .returning('name')
    .then((allNames) => {
      res.json(allNames)
    })
}

// INSERT NEW TIMELINE INTO DATABASE
const newTimeline = (req, res, next) => {
  knex('timelines')
    .insert({
      name: req.body.name,
      description: req.body.description,
      timeAxis: JSON.stringify({ scale: req.body.timeAxis })
    })
    .then((result) => {
      res.json({ message: 'Successful' })
    })
}

// GET USER TOKEN AND DECODE TO CHECK DATABASE FOR MATCHING TIMELINE IDS
const getCookie = (req, res, next) => {
  const payload = jwt.verify(req.cookies.fstoken, KEY)
  knex('users')
    .select(['timelines.created_at AS timeline.created', 'timelines.description AS timeline.description', 'timelines.updated_at AS timeline.updated', 'timelines.name AS timeline.name', 'timelines.orientation AS timeline.orientation', 'timelines.timeAxis AS timeline.axis', 'events.content AS event.name', 'events.description AS event.description', 'events.start AS event.start', 'events.end AS event.end', 'timelines.zoomMax AS zoom', 'timelines.min AS min', 'timelines.max AS max'])
    // .select('*')
    .join('users_timelines', 'users_timelines.users_id', 'users.id')
    .join('timelines', 'timelines.id', 'users_timelines.timelines_id')
    .join('events', 'events.timeline_id', 'timelines.id')
    .where('users.username', payload.username)
    .then((result) => {
      if (result.length < 1) {
        res.send('no timeline')
      } else {
        res.json(result)
      }
    })
}

router.get('/', dash)
router.get('/create-timeline', getCookie)
router.get('/emails', getUserEmails)
router.get('/names', getTimelineNames)
router.post('/', newTimeline)

//  EXPORTS
module.exports = router
