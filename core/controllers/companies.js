const requireRoot = require('app-root-path').require;
const Op = require('sequelize').Op;
const errors = require('throw.js');


module.exports = (Company) => {

  async function getAll() {
    return await Company.findAll({
      attributes: ['id', 'companyName']
    });
  }

  async function getByID(companyID) {
    const company = await Company.findById(companyID);
    if (!company) {
      return new errors.NotFound();
    }
    return company;
  }

  async function getByName(name) {
    return await Company.find({
      where: {
        companyName: {
          [Op.eq]: name
        }
      }
    });
  }

  async function create(name) {
    let company = await getByName(name);
    if(company) {
      throw new errors.Conflict();
    }

    company = await Company.create({
      companyName: name
    });
    if (!company) {
      return new errors.InternalServerError();
    }

    return company;
  }

  return {
    getAll,
    getByID,
    getByName,
    create
  };
};