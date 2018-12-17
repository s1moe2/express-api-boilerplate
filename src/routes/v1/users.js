// const requireRoot = require('app-root-path').require
const express = require('express')
const router = express.Router()

// const { users } = requireRoot('/src/controllers');

router.post('/', async (req, res, next) => {
  res.apiSuccess({}, 200)
})

module.exports = router
