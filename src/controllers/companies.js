const requireRoot = require('app-root-path').require
const Exceptions = requireRoot('/src/util/exceptions')
const HttpStatus = require('http-status-codes')
const { companies } = requireRoot('/src/data/repositories')

const list = async (req, res, next) => {
  const comps = await companies.getAllCompanies()
  return res.apiSuccess(comps)
}

const getByID = async (req, res, next) => {
  const companyID = req.params.id

  const company = await companies.findByID(companyID)
  if (!company) {
    throw new Exceptions.RecordNotFoundException()
  }
  return res.apiSuccess(company)
}

const create = async (req, res, next) => {
  const name = req.body.name

  const newCompany = await companies.createCompany(name)
  if (!newCompany) {
    throw new Exceptions.RecordCreationException()
  }
  return res.apiSuccess(newCompany, HttpStatus.CREATED)
}

const update = (req, res, next) => {
  return null // return companies.updateCompany(companyData)
}

module.exports = {
  list,
  getByID,
  create,
  update,
}
