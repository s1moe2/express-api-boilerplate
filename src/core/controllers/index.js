const orm = require('../domain-model');

module.exports = {
  CompanyController: require('./companies')(orm),
  UserController: require('./users')(orm)
};