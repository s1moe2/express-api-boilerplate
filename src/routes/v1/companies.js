const requireRoot = require('app-root-path').require
const express = require('express')
const router = express.Router()

const { isAuthenticated } = requireRoot('/src/middleware/auth/passport-config')
const { companies } = requireRoot('/src/controllers')
const { controllerHandler: c } = requireRoot('/src/util/routing')

router.get('/', isAuthenticated, c(companies.getAll))

router.get('/:id', isAuthenticated, c(companies.getByID, (req) => [req.params.id]))

router.post('/', isAuthenticated, c(companies.create, (req) => [req.body.name]))

module.exports = router
