const requireRoot = require('app-root-path').require;
const Op = require('sequelize').Op;
const Exceptions = requireRoot('/src/util/exceptions');


module.exports = (orm) => {

  // public
  async function getAll() {
    return await orm.Company.findAll({
      attributes: ['id', 'companyName']
    });
  }

  // public
  async function getByID(companyID) {
    const company = await orm.Company.findById(companyID);
    if (!company) {
      throw new Exceptions.RecordNotFoundException();
    }
    return company;
  }

  async function getByName(name) {
    const company = await orm.Company.find({
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

    company = await orm.Company.create({
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