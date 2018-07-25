const requireRoot = require('app-root-path').require;
const express = require('express');
const router = express.Router();

const { check, body } = require('express-validator/check');
const AuthService = requireRoot('/src/services/auth-service');

router.post('/signin', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
], AuthService.signin);

router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  //body('confirmPassword', 'Passwords do not match').equals(req.body.password)
  body('confirmPassword').custom(async (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
  })
], AuthService.signup);

router.get('/confirm', (req, res) => {
  console.log("CONFIRMED");
  console.log(req.query.t);
  res.apiSuccess();
});

module.exports = router;