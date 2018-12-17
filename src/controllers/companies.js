const requireRoot = require('app-root-path').require
const Exceptions = requireRoot('/src/util/exceptions')
const { companies } = requireRoot('/src/data/repositories')

const list = async (req, res, next) => {
  const comps = await companies.getAllCompanies()
  return res.apiSuccess(comps)
}

const getByID = async (req, res, next) => {
  const companyID = req.query.id

  const company = await companies.findByID(companyID)
  if (!company) {
    throw new Exceptions.RecordNotFoundException()
  }
  return res.apiSuccess(company)
}

const create = (req, res, next) => {
  const name = req.body.name

  return companies.createCompany(name)
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
