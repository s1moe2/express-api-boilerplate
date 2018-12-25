const requireRoot = require('app-root-path').require
const Op = require('sequelize').Op
const Exceptions = requireRoot('/src/util/exceptions')

const CompaniesRepository = (orm) => {
  const findByID = (companyID) => {
    return orm.Company.findByPk(companyID)
  }

  const getAllCompanies = () => {
    return orm.Company.findAll({
      attributes: ['id', 'companyName'],
    })
  }

  const findByName = (name) => {
    return orm.Company.findOne({
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

    return orm.Company.create({
      companyName: name,
    })
  }

  return {
    findByID,
    getAllCompanies,
    findByName,
    createCompany,
  }
}

module.exports = CompaniesRepository
