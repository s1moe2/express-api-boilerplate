const requireRoot = require('app-root-path').require;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const libraries = requireRoot('/libraries');

router.use(bodyParser.json());
router.use(libraries.middleware.responseHelpers);

router.use(cors({credentials: true, origin: true}));
router.options('*', cors());

//router.use('/', require('./identity'));

router.use('/companies', require('./companies'));

router.use((req, res, next) => {
  res.unknownApi(`Unhandled Internal API url: ${req.method} ${req.originalUrl}`);
});

router.use((err, req, res, next) => {
  /*if (err instanceof RecordNotFoundException) {
    res.apiUserFail(err, err.errorFields);
  } else if (err instanceof library.exceptions.AuthenticationException) {
    res.apiAuthenticationFail(err);
  } else {
    res.apiSystemFail(err);
  }*/

  //logger.error(err);

  if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json(err);
});

module.exports = router;