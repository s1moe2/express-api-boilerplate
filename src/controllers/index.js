const requireRoot = require('app-root-path').require;
const orm = requireRoot('/src/data/domain-model/');

module.exports = {
  CompanyController: require('./companies')(orm),
  UserController: require('./users')(orm)
};