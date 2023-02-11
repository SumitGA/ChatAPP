const router = require('express').Router()

router.get('/home', (req, res) => {
  res.send('Home Screen')
})

router.use('/', require('./auth'))

module.exports = router;