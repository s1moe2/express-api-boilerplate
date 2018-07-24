const passport = require('passport');
const jwt = require('jsonwebtoken');
const HttpErrors = require('http-errors');
const HttpStatus = require('http-status-codes');
const orm = require('../../core/domain-model');
const Op = require('sequelize').Op;
const { validationResult } = require('express-validator/check');

const secret = "thisisnotasecret";

async function signin(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.apiError(new HttpErrors.BadRequest(), { errors: errors.array() });
  }

  try {
    const user = await orm.User.findOne({
      where: {
        email: {
          [Op.eq]: req.body.email
        }
      }
    });

    if (!user) {
      return next(new HttpErrors.Unauthorized());
    }
    if (!user.comparePassword(password)) {
      return next(new HttpErrors.Unauthorized());
    }

    // if user is found and password is right create a token
    const token = jwt.sign(user, config.secret);
    // return the information including token as JSON
    return res.apiSuccess({ token: `JWT ${token}` });

  } catch (err) {
    return next(new HttpErrors.InternalServerError());
  }
}

async function signup(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.apiError(new HttpErrors.BadRequest(), { errors: errors.array() });
  }

  try {
    const user = await orm.User.findOne({
      where: {
        email: {
          [Op.eq]: req.body.email
        }
      }
    });

    if (user) {
      return next(new HttpErrors.Conflict());
    }

    const newUser = await orm.User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    });

    if (newUser) {
      return res.apiSuccess('Successful created new user.', HttpStatus.CREATED);
    }
  } catch (err) {
    return next(new HttpErrors.InternalServerError());
  }
}

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.apiError(new HttpErrors.Forbidden());
  }

}

module.exports = {
  signin,
  signup,
  verifyToken
};