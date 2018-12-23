const requireRoot = require('app-root-path').require
const express = require('express')
const router = express.Router()
const { check } = require('express-validator/check')

const { auth } = requireRoot('/src/controllers')

const pwdLength = Number(process.env.PASSWORD_LENGTH || 5)

router.post('/signin', [
  check('email').isEmail(),
], auth.signin)

router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: pwdLength }),
  check('confirmPassword').custom((value, { req }) => value === req.body.password),
], auth.signup)

router.get('/confirm', [
  check('token').exists(),
], auth.confirmSignup)

router.post('/recover', [
  check('email').isEmail(),
], auth.recover)

router.post('/reset', [
  check('token').exists(),
  check('password').isLength({ min: pwdLength }),
  check('confirmPassword').isLength({ min: pwdLength }),
], auth.resetPassword)

module.exports = router
