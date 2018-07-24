
[![Build Status](https://travis-ci.org/s1moe2/express-api-boilerplate.svg?branch=master)](https://travis-ci.org/s1moe2/express-api-boilerplate)
[![codecov](https://codecov.io/gh/s1moe2/express-api-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/s1moe2/express-api-boilerplate)
[![Known Vulnerabilities](https://snyk.io/test/github/s1moe2/express-api-boilerplate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/s1moe2/express-api-boilerplate?targetFile=package.json)


# Simple Node.js+Express+Sequelize API server.js boilerplate

### Getting Started
Before anything else you need to create a database and update the environment variables in the `.env` file (you can copy-paste `.env.example` and edit as needed).

For the database I used PostgreSQL but you can easily use any flavour accepted by Sequelize by changing the env variable `DB_DIALECT`.


### NPM Scrips
```bash
# Runs migrations and starts with nodemon (showing a lot of debug info)
npm run dev

# Runs migrations and then the tests in `./test`
npm test

# Starts the app in production mode (well, not exactly production ready but you get the idea)
npm start

# Runs tests and generates coverage report
npm run coverage
```

### Travis-CI integration
There's a configuration file for the integration with Travis if you want to use it.

Note that it's using a PostgreSQL (in Travis) to run the tests. If you want to use any other make sure you change the file.

Coveralls was not updating the status after each build. Moved to `codecov.io` which doesn't need additional setup.
~~Additionally, there's an integration with Coveralls. If you want to use it, you'll need to enter your Coveralls token in `.coveralls.yml` (again, copy-pase the existing sample).~~



### Project structure
```
├── coverage  				(coverage report results)
├── src						(source code)
│   ├── bin					(server startup scripts)
│   ├── config				(configurations)
│   ├── controllers			(handlers/business-logic)
│   ├── data				(data/database related pieces)
│   │   ├── domain-model	(orm: sequelize models)
│   │   └── migrations		(database migration files)
│   ├── middleware			(custom express middlewares)
│   │   └── auth			(auth/passport middlewares)
│   ├── routes				(all routing)
│   │   └── v1				(API v1 routes)
│   └── util				(utility classes/functions/modules)
└── test					(all tests)
    └── unit-tests
```

### Authentication
Implemented with Passport.js JWT strategy. Key files to this are in `/src/middleware/auth`.
- _passport-config_ => Passport strategy configuration (simply taking the user ID from the token's payload and searching for the user with that ID in the database). JWT secret and token TTL/expiration time are configured as environment variables.
- _passport-helpers_ => Handlers for sign-in/sign-out, authentication check and other related utilities.



### Notes
This work is currently in progress. Contributions, opinions and advice are more than welcome. I'm doing this to (possibly) use on a personal project but mostly for learning purposes.
