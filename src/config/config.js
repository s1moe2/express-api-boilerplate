require('dotenv').config()

const commonConfig = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  operatorsAliases: false,
  logging: process.env.DB_LOGGING || false,
}

const testConfig = Object.assign({}, commonConfig)
testConfig.database = process.env.DB_NAME_TEST

module.exports = {
  development: commonConfig,
  test: testConfig,
  production: commonConfig,
}
