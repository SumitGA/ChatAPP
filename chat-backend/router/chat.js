const router = require('express').Router()
const { index } = require('../controllers/chatController')
const { validate } = require('../validators')
const { rules: updateRules } = require('../validators/user/update')
const { auth } = require('../middleware/auth')

router.get('/', [auth], index)

module.exports = router
