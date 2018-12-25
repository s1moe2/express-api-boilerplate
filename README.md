
[![Build Status](https://travis-ci.org/s1moe2/express-api-boilerplate.svg?branch=master)](https://travis-ci.org/s1moe2/express-api-boilerplate)
[![codecov](https://codecov.io/gh/s1moe2/express-api-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/s1moe2/express-api-boilerplate)
[![Known Vulnerabilities](https://snyk.io/test/github/s1moe2/express-api-boilerplate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/s1moe2/express-api-boilerplate?targetFile=package.json)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)


# Node.js+Express+Sequelize API server.js boilerplate

## Getting Started
(Note: For the database I used PostgreSQL but you can easily use any flavour accepted by Sequelize by changing the env variable `DB_DIALECT`.)

1. Create a database and update the environment variables in the `.env` file (copy-paste `.env.example` and edit as needed).
3. `npm i`
2. `npm run migrate`


## NPM Scrips
```bash
# Starts the server with nodemon
npm run dev

# Drops and creates the database, runs migrations and starts the server with nodemon
npm run dev-hard

# Runs migrations and then the tests in `./test`
npm test

# Starts the app in production mode
npm start

# Runs tests and generates coverage report
npm run coverage

# Displays previously generated coverage report
npm run report
```


## Design Principles

This application has a multi-layer architecture composed of: routes, controllers, services and repositories.

* **Routes**: The routes layer could be seen as API definition, containing only the enpoints, validation rules and the controller that handles the workload. No business logic or data access is done on any route.
* **Controllers**: Controllers are responsible for request/response handling, performing validations and executing most of the business logic, preferably in a declarative style. This means that, although the controller is aware if the logic, it should use services/repositories/utils to actually do the work.
* **Services**: Modular components that are responsible for something specific or generic such as mailing. One can also think of those as services that could be detatched from the server sometime in the future.
* **Repositories**: Repositories are used to centralize data access logic and wrap the ORM, isolating it from the rest of the application.


## Project structure
```
├── coverage  				(coverage report results)
├── src						(source code)
│   ├── bin					(server startup scripts)
│   ├── config				(configurations)
│   ├── controllers			(handlers/business-logic)
│   ├── data				(data/database related pieces)
│   │   ├── domain-model	(orm: sequelize models)
│   │   ├── migrations		(database migration files)
│   │   └── repositories	(data access layer)
│   ├── middleware			(custom express middlewares)
│   ├── routes				(all routing)
│   │   └── v1				(API v1 routes)
│   ├── services			(custom service modules)
│   └── util				(utility classes/functions/modules)
└── test					(all tests)
    └── v1					(integration tests for API v1)
```
