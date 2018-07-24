const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const HttpErrors = require('http-errors');
const Exceptions = require('../../util/exceptions');
const { verifyToken } = require('../../middleware/auth/passport-helpers');

router.use(bodyParser.json());

router.use(cors({ credentials: true, origin: true }));
router.options('*', cors());

router.use('//', function(req, res){
  res.apiSuccess({ message: "Welcome to the API", data: {} });
});

router.use('/companies', verifyToken, require('./companies'));
router.use('/users', require('./users'));

router.use('*', function(req, res){
  res.apiError(new HttpErrors.NotFound());
});

router.use((err, req, res, next) => {
  switch(err.constructor) {
    case Exceptions.RecordNotFoundException:
      return res.apiError(new HttpErrors.NotFound());

    case Exceptions.RecordAlreadyExistsException:
      return res.apiError(new HttpErrors.Conflict());

    case Exceptions.RecordCreationException:
      return res.apiError(new HttpErrors.InternalServerError());

    case Exceptions.AuthenticationException:
      return res.apiError(new HttpErrors.Unauthorized());

    default:
      res.apiError(new HttpErrors.InternalServerError());
  }
});

module.exports = router;