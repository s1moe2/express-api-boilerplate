const HttpErrors = require('http-errors');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const expressValidator = require('express-validator');
const routes = require('./routes');
const app = express();

app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(require('./middleware/response'));
app.use(passport.initialize());

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
  res.json('error');
});

module.exports = app;


// "Handle" all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', error);
});
