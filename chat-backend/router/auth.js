const router = require('express').Router()

router.post('/login', (req, res) => {
  res.send('Home Screen')
})

router.post('/register', (req, res) => {
  res.send('Register screen works now.')
})

module.exports = router;