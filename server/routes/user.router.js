const router = require('express').Router()
const controller = require('../controllers/user.controller.js')

// for test
const { requireAuth } = require('../middleware')
const { ambers } = require('../samples/data')

router.post('/signup', controller.signup)
router.post('/login', controller.login)

// for test
router.use(requireAuth)
router.get('/ambers', (req, res) => {
  res.status(200).send(ambers)
})

module.exports = router
