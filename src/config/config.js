require('dotenv').config();

const commonConfig = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  operatorsAliases: false
};

module.exports = {
  development: commonConfig,
  test: commonConfig,
  production: commonConfig
};