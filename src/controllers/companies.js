const requireRoot = require('app-root-path').require
const Exceptions = requireRoot('/src/util/exceptions')
const { companies } = requireRoot('/src/services')

const getAll = () => {
  return companies.findCompanies()
}

const getByID = async (companyID) => {
  const company = await companies.findByID(companyID)
  if (!company) {
    throw new Exceptions.RecordNotFoundException()
  }
  return company
}

const create = (name) => {
  return companies.createCompany(name)
}

module.exports = {
  getAll,
  getByID,
  create
}
