const passport = require('passport');
const jwt = require('jsonwebtoken');
const HttpErrors = require('http-errors');
const HttpStatus = require('http-status-codes');
const orm = require('../../core/domain-model');
const Op = require('sequelize').Op;
const { validationResult } = require('express-validator/check');


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
    if (!user.comparePasswordSync(req.body.password)) {
      return next(new HttpErrors.Unauthorized());
    }

    // if user is found and password is right create a token
    const token = generateToken(user);
    // return the information including token as JSON
    return res.apiSuccess({ token: `Bearer ${token}` });

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

function isAuthenticated(req, res, next) {
  return passport.authenticate('jwt', { session: false })(req, res, next);

  // TODO Keeping it simple... No custom authentication callback needed for now
  /*return passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new HttpErrors.Forbidden());
    }

    // TODO in the future if we need to add more token validations this is the place. Revoked tokens, etc

    req.user = user;
    next();
  })(req, res, next);*/
}

function generateToken(user) {
  return jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
}



module.exports = {
  signin,
  signup,
  isAuthenticated
};