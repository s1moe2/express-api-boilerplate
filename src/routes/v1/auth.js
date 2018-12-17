const requireRoot = require('app-root-path').require
const express = require('express')
const router = express.Router()
const { check, body } = require('express-validator/check')

const { auth } = requireRoot('/src/controllers')

router.post('/signin', [
  check('email').isEmail(),
], auth.signin)

router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  body('confirmPassword').custom(async (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
  }),
], auth.signup)

router.get('/confirm', auth.confirm)

module.exports = router
