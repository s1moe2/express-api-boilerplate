const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(bodyParser.json());

router.use(cors({ credentials: true, origin: true }));
router.options('*', cors());

//router.use('/', require('./identity'));

router.use('/companies', require('./companies'));

router.use((err, req, res, next) => {
  if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json(err);
});

module.exports = router;