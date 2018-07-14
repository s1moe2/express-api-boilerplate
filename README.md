[![Build Status](https://travis-ci.org/s1moe2/express-api-boilerplate.svg?branch=master)](https://travis-ci.org/s1moe2/express-api-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/s1moe2/express-api-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/s1moe2/express-api-boilerplate?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/s1moe2/express-api-boilerplate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/s1moe2/express-api-boilerplate?targetFile=package.json)


# Simple Node.js+Express+Sequelize API server boilerplate

### Getting Started
Before anything else you need to create a database and update the configuration file in `/config/connection.json` (you can copy-paste `connection.json.sample` and edit as needed).

I used PostgreSQL but you can easily use any flavour accepted by Sequelize.

### NPM Scrips
```bash
# Runs migrations and starts with nodemon
npm run dev

# Runs migrations and tests
npm test

# Starts the app in production mode (well, not exactly production ready but you get the idea)
npm start

# Runs tests and generates coverage report
npm run coverage
```

### Travis-CI integration
There's a configuration file for the integration with Travis if you want to use it.

Note that it's using a PostgreSQL (in Travis) to run the tests. If you want to use any other make sure you change the file.

Additionally, there's also an integration with Coveralls. If you want to use it, you'll need to enter your Coveralls token in `.coveralls.yml` (again, copy-pase the existing sample).


### Notes
This work is currently in progress. Opinions and advice is more than welcome as I'm doing this to use on a personal project but mostly for learning purposes.
