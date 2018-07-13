const requireRoot = require('app-root-path').require;
const express = require('express');
const router = express.Router();
const libraries = requireRoot('/libraries');
const HttpStatus = require('http-status-codes');

const CompanyController = requireRoot('/core/controllers/companies')();

router.param('id', libraries.middleware.paramsValidators.validateId);

router.get('/', async (req, res, next) => {
  const companies = await CompanyController
    .getAll()
    .catch(err => { next(err); });

  if(companies) {
    res.status(HttpStatus.OK).json(companies);
  }
});

router.get('/:id', async (req, res, next) => {
  const company = await CompanyController
    .getByID(req.params.id)
    .catch(err => { next(err); });

  if(company) {
    res.status(HttpStatus.OK).json(company);
  }
});

router.post('/', async (req, res, next) => {
  const company = await CompanyController
    .create(req.body.name)
    .catch(err => { next(err); });

  if(company) {
    res.status(HttpStatus.CREATED).json(company);
  }
});

module.exports = router;