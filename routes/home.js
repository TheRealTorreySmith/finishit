const express = require('express')

const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const KEY = process.env.JWT_KEY

let mostRecentTimelineId

// const getMostRecentTimeline = (r, s, n) => {
//   if (r.cookies.fstoken) {
//     const payload = jwt.verify(r.cookies.fstoken, KEY)
//     knex('timelines')
//       .select('timelines.id')
//       .join('users_timelines', 'users_timelines.timelines_id', 'timelines.id')
//       .where('users_timelines.users_id', payload.id)
//       // .returning(['timelines.id'])
//       .then((result) => {
//         // console.log('Most Recent Timeline Result',result)
//         return result[0].id
//       })
//   }
// }

/* GET DASHBOARD PAGE */
const dash = (req, res, next) => {
  if (req.cookies.fstoken) {
    const payload = jwt.verify(req.cookies.fstoken, KEY)
    knex('timelines')
      .select('timelines.id')
      .join('users_timelines', 'users_timelines.timelines_id', 'timelines.id')
      .where('users_timelines.users_id', payload.id)
      .then((tId) => {
        mostRecentTimelineId = tId[tId.length - 1].id
        knex('users')
          .select(['timelines.created_at AS timeline.created', 'timelines.description AS timeline.description', 'timelines.updated_at AS timeline.updated', 'timelines.name AS timeline.name', 'timelines.orientation AS timeline.orientation', 'timelines.timeAxis AS timeline.axis', 'events.content AS event.name', 'events.description AS event.description', 'events.start AS event.start', 'events.end AS event.end', 'timelines.zoomMax AS zoom', 'timelines.min AS min', 'timelines.max AS max'])
          .join('users_timelines', 'users_timelines.users_id', 'users.id')
          .join('timelines', 'timelines.id', 'users_timelines.timelines_id')
          .join('events', 'events.timeline_id', 'timelines.id')
          .where('users.username', payload.username)
          .where('events.timeline_id', mostRecentTimelineId)
          .where('timelines.id', mostRecentTimelineId)
          .then((result) => {
            console.log(result)
            if (result.length < 1) {
              res.render('home', { title: 'Dashboard', username: payload.username, confirm: 'No' })
            } else {
              res.render('home', { title: 'Dashboard', username: payload.username, confirm: 'Yes' })
            }
          })
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

// QUERY DATABASE FOR TIMELINE ID
const getTimelineId = (req, res, next) => {
  knex('timelines')
    .select('timelines.id')
    .then((timelineId) => {
      res.json(timelineId)
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
  const payload = jwt.verify(req.cookies.fstoken, KEY)
  knex('timelines')
    .insert({
      name: req.body.name,
      description: req.body.description,
      timeAxis: JSON.stringify({ scale: req.body.timeAxis })
      // min: req.body.min,
      // max: req.body.max,
      // zoomMax: req.body.zoomMax
    })
    .returning(['id'])
    .then((data) => {
      knex('users_timelines')
        .insert({
          timelines_id: data[0].id,
          users_id: payload.id
        })
        .then((eventData) => {
          knex('events')
            .insert({
              timeline_id: data[0].id,
              content: 'First Event',
              description: 'This is your first event'
              // start: req.body.min
            })
            .then((result) => {
              res.json({
                message: 'Successful'
              })
            })

        })
    })
}

// GET USER TOKEN AND DECODE TO CHECK DATABASE FOR MATCHING TIMELINE IDS
const getCookie = (req, res, next) => {
  const payload = jwt.verify(req.cookies.fstoken, KEY)
  knex('timelines')
    .select('timelines.id')
    .join('users_timelines', 'users_timelines.timelines_id', 'timelines.id')
    .where('users_timelines.users_id', payload.id)
    .then((tId) => {
      mostRecentTimelineId = tId[tId.length - 1].id
      knex('users')
        .select(['timelines.created_at AS timeline.created', 'timelines.description AS timeline.description', 'timelines.updated_at AS timeline.updated', 'timelines.name AS timeline.name', 'timelines.orientation AS timeline.orientation', 'timelines.timeAxis AS timeline.axis', 'events.content AS event.name', 'events.description AS event.description', 'events.start AS event.start', 'events.end AS event.end', 'timelines.zoomMax AS zoom', 'timelines.min AS min', 'timelines.max AS max'])
        .join('users_timelines', 'users_timelines.users_id', 'users.id')
        .join('timelines', 'timelines.id', 'users_timelines.timelines_id')
        .join('events', 'events.timeline_id', 'timelines.id')
        .where('users.username', payload.username)
        .where('events.timeline_id', mostRecentTimelineId)
        .then((result) => {
          if (result.length < 1) {
            res.send('no timeline')
          } else {
            res.json(result)
          }
        })
    })
}

router.get('/', dash)
router.get('/create-timeline', getCookie)
router.get('/emails', getUserEmails)
router.get('/names', getTimelineNames)
router.get('/timeline/id', getTimelineId)
router.post('/', newTimeline)

//  EXPORTS
module.exports = router
