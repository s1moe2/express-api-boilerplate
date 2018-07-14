const requireRoot = require('app-root-path').require;
const Op = require('sequelize').Op;
const errors = require('throw.js');


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
      throw new errors.NotFound();
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
    if(company) {
      throw new errors.Conflict();
    }

    company = await Company.create({
      companyName: name
    });
    if (!company) {
      throw new errors.InternalServerError();
    }

    return company;
  }

  return {
    getAll,
    getByID,
    create
  };
};