const express = require('express')
require('express-async-errors')
const logger = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const passportConfig = require('./middleware/auth/passport')
const passport = require('passport')
const routes = require('./routes')
const Exceptions = require('./util/exceptions')

const app = express()

// middleware jungle
app.use(compression())
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(require('./middleware/response'))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// passport configuration & initialization
passportConfig.init()

// app routes
app.use('/', routes)



// catch 404
app.use((req, res) => {
  res.apiError(new Exceptions.RouteNotFoundException())
})

// error handler
app.use((err, req, res, next) => {
  if (err instanceof Exceptions.AppException) {
    res.apiError(err)
  }

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.apiError(new Exceptions.AppException(err.message, err.status || 500))
})

module.exports = app
