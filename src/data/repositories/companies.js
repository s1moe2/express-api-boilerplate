const requireRoot = require('app-root-path').require
const orm = requireRoot('/src/data/domain-model')
const Op = require('sequelize').Op
const Exceptions = requireRoot('/src/util/exceptions')

const findByID = (companyID) => {
  return orm.Company.findByPk(companyID)
}

const getAllCompanies = () => {
  return orm.Company.findAll({
    attributes: ['id', 'companyName'],
  })
}

const findByName = (name) => {
  return orm.Company.find({
    where: {
      companyName: {
        [Op.eq]: name,
      },
    },
  })
}

const createCompany = async (name) => {
  let company = await findByName(name)
  if (company) {
    throw new Exceptions.RecordAlreadyExistsException()
  }

  company = await orm.Company.create({
    companyName: name,
  })
  if (!company) {
    throw new Exceptions.RecordCreationException()
  }

  return company
}

module.exports = {
  findByID,
  getAllCompanies,
  findByName,
  createCompany,
}
