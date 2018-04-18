//IMPORTS
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

// QUERY DATABASE FOR ALL USER EMAILS
const getUserEmails = (req, res, next) => {
  knex('users')
    .select('*')
    .then((userEmails) => {
      res.json(userEmails)
    })
}

// QUERY DATABASE FOR ALL TIMELINE NAMES
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
      description: req.body.description
    })
    .then((result) => {
      res.json({ message: 'Successful' })
    })
}

const getTimelineData = (req, res, next) => {
  const payload = jwt.verify(req.cookies.fstoken, KEY)
  console.log(req.params)
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


// ROUTE REQUESTS
router.get('/', renderPage)
router.get('/emails', getUserEmails)
router.get('/names', getTimelineNames)
router.get('/default', getTimelineData)
router.get('/:timelineId', renderPage)
router.get('/:timelineId', getTimelineData)
router.post('/', newTimeline)

// EXPORTS
module.exports = router
