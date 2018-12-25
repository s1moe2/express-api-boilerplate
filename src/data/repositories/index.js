const requireRoot = require('app-root-path').require
const orm = requireRoot('/src/data/domain-model')

const companies = require('./companies-repository')(orm)
const users = require('./users-repository')(orm)

module.exports = {
  companies,
  users,
}
