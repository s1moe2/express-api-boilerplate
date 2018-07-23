const requireRoot = require('app-root-path').require;
const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator/check');
const HttpErrors = require('http-errors');
const HttpStatus = require('http-status-codes');

const User = requireRoot('/src/core/domain-model').User;
const UsersController = requireRoot('/src/core/controllers/companies')(User);

router.get('/', async (req, res, next) => {
  try {
    const users = await UsersController.getAll();

    return res.apiSuccess(users);
  } catch(err) {
    next(err);
  }
});


module.exports = router;