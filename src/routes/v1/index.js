const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const HttpErrors = require('http-errors')

router.use(bodyParser.json())

router.use(cors({ credentials: true, origin: true }))
router.options('*', cors())

router.use('//', function (req, res) {
  res.apiSuccess({ message: 'Welcome to the API', data: {} })
})

router.use('/companies', require('./companies'))
router.use('/users', require('./users'))

router.use('*', function (req, res) {
  res.apiError(new HttpErrors.NotFound())
})

router.use((err, req, res, next) => {
  res.apiError(new HttpErrors.InternalServerError(err))
})

module.exports = router
