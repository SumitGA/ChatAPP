const router = require('express').Router()
const { login, register } = require('../controllers/authController')
const { body } = require('express-validator')

router.post('/login', login)

// Using express validator to validate user inputs although we have implemented DB constraints.
router.post(
  '/register',
  [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('gender').notEmpty(),
  ],
  register,
)

module.exports = router
