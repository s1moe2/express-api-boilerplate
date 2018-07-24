const express = require('express');
const router = express.Router();

const { check } = require('express-validator/check');
const passportHelpers = require('../middleware/auth/passport-helpers');

router.post('/signin', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
], passportHelpers.signin);

router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
], passportHelpers.signup);

module.exports = router;