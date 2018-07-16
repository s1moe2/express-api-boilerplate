const requireRoot = require('app-root-path').require;
const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator/check');
const HttpStatus = require('http-status-codes');

const Company = requireRoot('/src/core/domain-model').Company;

const CompanyController = requireRoot('/src/core/controllers/companies')(Company);

router.get('/', async (req, res, next) => {
  const companies = await CompanyController
    .getAll()
    .catch(err => { next(err); });

  if(companies) {
    res.status(HttpStatus.OK).json(companies);
  }
});

router.get('/:id',
  // validations
  [
    param('id').isNumeric()
  ],

  // juice
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const company = await CompanyController
      .getByID(req.params.id)
      .catch(err => { next(err); });

    if(company) {
      res.status(HttpStatus.OK).json(company);
    } else {
      res.status(HttpStatus.NOT_FOUND);
    }
  }
);

router.post('/', async (req, res, next) => {
  const company = await CompanyController
    .create(req.body.name)
    .catch(err => { next(err); });

  if(company) {
    res.status(HttpStatus.CREATED).json(company);
  }
});

module.exports = router;