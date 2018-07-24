const requireRoot = require('app-root-path').require;
const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator/check');
const HttpErrors = require('http-errors');
const HttpStatus = require('http-status-codes');

router.post('/', async (req, res, next) => {
  res.apiSuccess({}, 200);
});


module.exports = router;