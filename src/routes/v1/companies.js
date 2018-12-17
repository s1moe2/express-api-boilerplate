const requireRoot = require('app-root-path').require
const express = require('express')
const router = express.Router()

const { isAuthenticated } = requireRoot('/src/middleware/auth/passport-config')
const { companies } = requireRoot('/src/controllers')

router.get('/', isAuthenticated, companies.list)

router.get('/:id', isAuthenticated, companies.getByID)

router.post('/', isAuthenticated, companies.create)

// router.post('/', isAuthenticated, companies.update)

module.exports = router
