const Op = require('sequelize').Op;
const Exceptions = require('../../util/exceptions');


module.exports = (Company) => {

  // public
  async function getAll() {
    return await Company.findAll({
      attributes: ['id', 'companyName']
    });
  }

  // public
  async function getByID(companyID) {
    const company = await Company.findById(companyID);
    if (!company) {
      throw new Exceptions.RecordNotFoundException();
    }
    return company;
  }

  async function getByName(name) {
    const company = await Company.find({
      where: {
        companyName: {
          [Op.eq]: name
        }
      }
    });

    return company;
  }

  // public
  async function create(name) {
    let company = await getByName(name);
    if (company) {
      throw new Exceptions.RecordAlreadyExistsException();
    }

    company = await Company.create({
      companyName: name
    });
    if (!company) {
      throw new Exceptions.RecordCreationException();
    }

    return company;
  }

  return {
    getAll,
    getByID,
    create
  };
};