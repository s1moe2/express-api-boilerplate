const requireRoot = require('app-root-path').require;
const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator/check');
const HttpErrors = require('http-errors');
const HttpStatus = require('http-status-codes');

const { CompanyController } = requireRoot('/src/core/controllers');

router.get('/', async (req, res, next) => {
  try {
    const companies = await CompanyController.getAll();

    return res.apiSuccess(companies);
  } catch(err) {
    next(err);
  }
});

router.get('/:id',
  // validations
  [
    param('id').isNumeric()
  ],

  // juice
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.apiError(new HttpErrors.BadRequest(), { errors: errors.array() });
      }

      const company = await CompanyController.getByID(req.params.id);

      return res.apiSuccess(company);
    } catch(err) {
      next(err);
    }
  }
);

router.post('/', async (req, res, next) => {
  try {
    const company = await CompanyController.create(req.body.name);

    if(!company) {
      return res.apiError(new HttpErrors.InternalServerError());
    }

    return res.apiSuccess(company, HttpStatus.CREATED);
  } catch(err) {
    next(err);
  }
});

module.exports = router;