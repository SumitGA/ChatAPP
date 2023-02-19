const router = require('express').Router()
const {
  index,
  create,
  messages,
  deleteChat,
} = require('../controllers/chatController')
const { validate } = require('../validators')
const { rules: updateRules } = require('../validators/user/update')
const { auth } = require('../middleware/auth')

router.get('/', [auth], index)
router.get('/messages', [auth], messages)
router.post('/create', [auth], create)
router.delete('/:id', [auth], deleteChat)

module.exports = router
