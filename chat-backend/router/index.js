const router = require('express').Router()

router.get('/home', (req, res) => {
  res.send('Home Screen')
})

router.use('/', require('./auth'))
router.use('/users', require('./user'))

module.exports = router
