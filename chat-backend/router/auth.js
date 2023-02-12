const router = require('express').Router()
const { login, register } = require('../controllers/authController')
const { body } = require('express-validator')
const { validate } = require('../validators')
const { rules: registrationRules } = require('../validators/auth/register')
const { rules: loginRules } = require('../validators/auth/login')

router.post('/login', [loginRules, validate], login)

// Using express validator to validate user inputs although we have implemented DB constraints.
router.post('/register', [registrationRules, validate], register)

module.exports = router
