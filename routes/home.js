const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const KEY = process.env.JWT_KEY

/* GET DASHBOARD PAGE */
const dash = (req, res, next) => {
  res.render('home', { title: 'Dashboard' })
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
  console.log(req.body)
  knex('timelines')
    .insert({
      name: req.body.name,
      description: req.body.description
    })
    .then((result) => {
      res.json({ message: 'Successful' })
    })
}

router.get('/', dash)
router.get('/emails', getUserEmails)
router.get('/names', getTimelineNames)
router.post('/', newTimeline)

//  EXPORTS
module.exports = router
