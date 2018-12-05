const requireRoot = require('app-root-path').require
const express = require('express')
const router = express.Router()
const { check, body } = require('express-validator/check')

const { auth } = requireRoot('/src/controllers')
const { controllerHandler: c } = requireRoot('/src/util/routing')

router.post('/signin', [
  check('email').isEmail()
], c(auth.signin, (req, res, next) => [req, res, next]))

router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  body('confirmPassword').custom(async (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
  })
], c(auth.signup, (req, res, next) => [req, res, next]))

router.get('/confirm', c(auth.confirm, (req) => [req.query.token]))

module.exports = router
