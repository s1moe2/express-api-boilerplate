const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const requireRoot = require('app-root-path').require // FIXME remove this from all files that use it and make it global
const Exceptions = requireRoot('/src/util/exceptions')

router.use(bodyParser.json())

router.use(cors({ credentials: true, origin: true }))
router.options('*', cors())

router.use('//', function (req, res) {
  res.apiSuccess({ message: 'Welcome to the API', data: {} })
})

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/companies', require('./companies'))

router.use('*', function (req, res) {
  res.apiError(new Exceptions.RouteNotFoundException())
})

// router.use((err, req, res, next) => {
//   res.apiError(new Exceptions.InternalServerError(err))
// })

module.exports = router
