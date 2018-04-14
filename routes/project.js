const express = require('express')
const router = express.Router()

/* GET PROJECT PAGE */
const selectedProject = (req, res, next) => {
  res.render('project', { title: ' The Selected Project Page' })
}

const defaultProject = (req, res, next) => {
  res.render('project', { title: ' The Default Project Page' })
}


router.get('/', defaultProject)
router.get('/:id', selectedProject)

module.exports = router
