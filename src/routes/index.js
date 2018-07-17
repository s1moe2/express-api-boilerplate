const requireRoot = require('app-root-path').require;
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({});
});

router.use('/v1', requireRoot('/src/routes/api'));

module.exports = router;