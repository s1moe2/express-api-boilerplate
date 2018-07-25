const requireRoot = require('app-root-path').require;
const jwt = require('jsonwebtoken');
const HttpErrors = require('http-errors');
const HttpStatus = require('http-status-codes');
const orm = requireRoot('/src/data/domain-model');
const Op = require('sequelize').Op;
const { validationResult } = require('express-validator/check');
const MailerService  = require('./mailer-service');

const signin = async (req, res, next) => {
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
    const token = generateToken(user, process.env.JWT_TTL);
    // return the information including token as JSON
    return res.apiSuccess({ token: `Bearer ${token}` });

  } catch (err) {
    return next(new HttpErrors.InternalServerError());
  }
};

const signup = async (req, res, next) => {
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
      const confirmToken = generateToken(newUser, 2);
      try {
        if(await MailerService.sendSignupConfirmationEmail(newUser, confirmToken)) {
          newUser.confirmationToken = confirmToken;
          newUser.save();
        }
      } catch (err) {
        //TODO delete user? try again? how many times?
        newUser.destroy({ force: true });
        return next(new HttpErrors.InternalServerError());
      }

      return res.apiSuccess('Successful created new user.', HttpStatus.CREATED);
    }
  } catch (err) {
    //return next(new HttpErrors.InternalServerError());
  }
};


const confirm = async (req, res) => {

};

const generateToken = (user, ttl) => {
  return jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
    expiresIn: `${ttl}h`
  });
};



module.exports = {
  signin,
  signup,
  confirm
};