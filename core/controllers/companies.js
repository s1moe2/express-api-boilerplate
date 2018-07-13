const requireRoot = require('app-root-path').require;
const orm = requireRoot('/core/domain-model');;
const Op = require('sequelize').Op;
const errors = require('throw.js');


module.exports = () => {

  async function getAll() {
    return await orm.Company.findAll({
      attributes: ['id', 'companyName']
    });
  }

  async function getByID(companyID) {
    const company = await orm.Company.findById(companyID);
    if (!company) {
      return new errors.NotFound();
    }
    return company;
  }

  async function getByName(name) {
    return await orm.Company.find({
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

    company = await orm.Company.create({
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