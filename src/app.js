const HttpErrors = require('http-errors')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const passportConfig = require('./middleware/auth/passport-config')
const passport = require('passport')
const routes = require('./routes')

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

// passport configuration
passportConfig.init()

// routes
app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.apiError(new HttpErrors.NotFound())
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json(err.message)
})

module.exports = app

// "Handle" all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', error)
})
