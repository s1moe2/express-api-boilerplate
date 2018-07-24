const HttpErrors = require('http-errors');
const express = require('express');
const expressValidator = require('express-validator');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const session = require('express-session');
const pg = require('pg');
const pgSessionStore = require('connect-pg-simple')(session);
const orm = require('./core/domain-model');
const passport = require('passport');
const routes = require('./routes');

const app = express();

// middleware jungle
app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require('./middleware/response'));

/*app.use(session({
  store: new pgSessionStore({
    pg: pg,
    tableName: 'Sessions',
    //conString: 'postgresql://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database
    conString: 'postgresql://postgres:m00se@127.0.0.1/api_dev'
  }),
  secret: 'notsuchabigsecret', //appConfig.sessionKey,
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: false
}));*/


// passport middleware
app.use(passport.initialize());
//app.use(passport.session());

// passport configuration
require('./middleware/auth/passport-config')(passport, orm);


// routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.apiError(new HttpErrors.NotFound());
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;


// "Handle" all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', error);
});
