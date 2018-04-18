//IMPORTS
const express = require('express')
const router = express.Router()
const knex = require('../knex')

/* GET TIMELINE PAGE */
const selectedTimeline = (req, res, next) => {
  res.render('timeline', { title: ' The Selected Timeline Page' })
}

const defaultTimeline = (req, res, next) => {
  res.render('timeline', { title: ' The Default Timeline Page' })
}

// QUERY DATABASE FOR ALL USER EMAILS
const getUserEmails = (req, res, next) => {
  knex('users')
    .select('*')
    .then(userEmails => {
      res.json(userEmails)
    })
}

//QUERY DATABASE FOR ALL TIMELINE NAMES
const getTimelineNames = (req, res, next) => {
  knex('timelines')
    .select('*')
    .returning('name')
    .then((allNames) => {
      res.json(allNames)
    })
}

//INSERT NEW TIMELINE INTO DATABASE
const newTimeline = (req, res, next) => {
  knex('timelines')
    .insert({
      name: req.body.name,
      description: req.body.description
    })
    .then(result => {
      res.json({message: 'Successful'})
    })
}

//ROUTE REQUESTS
router.get('/', defaultTimeline)
router.get('/emails', getUserEmails)
router.get('/names', getTimelineNames)
router.get('/:id', selectedTimeline)
router.post('/', newTimeline)

//EXPORTS
module.exports = router
