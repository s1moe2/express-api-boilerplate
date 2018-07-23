const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { to } = require('await-to-js');
const errors = require('throw.js');

module.exports = (UserController) => {

  function generateToken(key) {
    return jwt.sign({_id: key}, "authtoken"/*appConfig.authToken*/, {
      expiresIn: '24h'
    });
  }

  const LocalSignInStrategy =
    new LocalStrategy({ usernameField: 'email', session: false },
      async (email, password, done) => {
        try {
          let user = await UserController.authenticate(email, password);

          return done(null, user, generateToken(user.id));
        } catch(err) {
          done(err);
        }
      });

  const LocalSignUpStrategy =
    new LocalStrategy({ usernameField: 'email', passReqToCallback: true, session: false },
      async (req, username, password, done) => {
        try {
          let registration = {};
          registration.email = req.body.email.trim();
          registration.firstName = req.body.firstName.trim();
          registration.lastName = req.body.lastName.trim();
          registration.password = req.body.password;

          let newUser = await UserController.create(registration);

          return done(null, newUser, generateToken(newUser.id));
        } catch(err) {
          done(err);
        }
      });


  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "authtoken"/*appConfig.authToken*/
  };

  const LocalJwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    let [err, user] = await to(UserController.getById(payload._id, true));
    if(err) {
      done(err);
    }

    return done(null, user.toJSON());
  });


  function init() {
    passport.session();

    passport.use('local-signup', LocalSignUpStrategy);
    passport.use('local-signin', LocalSignInStrategy);
    passport.use('jwt', LocalJwtStrategy);

    return passport.initialize();
  }

  function isAuthenticated(req, res, next) {
    return passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new errors.Unauthorized());
      }

      // TODO in the future if we need to add more token validations this is the place. Revoked tokens, etc

      req.user = user;
      next();
    })(req, res, next);
  }

  function passIdentity(req, res, next) {
    return passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next();
      }

      req.user = user;
      next();
    })(req, res, next);
  }

  function hasAuthentication(req, res, next) {
    return passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new errors.Unauthorized());
      }

      return res.apiSuccess({
        user: user
      })
    })(req, res, next);
  }

  function login(req, res, next) {
    if (!req.body.username) {
      return next(new errors.Unauthorized('User name is required.'));
    }

    if (!req.body.password) {
      return next(new errors.Unauthorized('User password is required.'));
    }

    return passport.authenticate('local-signin', (err, user, token) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(errors.Unauthorized());
      }

      return res.apiSuccess({
        user: user,
        token: `JWT ${token}`
      });
    })(req, res, next);
  }

  function register(req, res, next) {
    if (!req.body.username) {
      throw new errors.BadRequest('User name is required.');
    }

    if (!req.body.email) {
      throw new errors.BadRequest('User email is required.');
    }

    if (!req.body.firstName) {
      throw new errors.BadRequest('User first name is required.');
    }

    if (!req.body.lastName) {
      throw new errors.BadRequest('User last name is required.');
    }

    if (!req.body.password) {
      throw new errors.BadRequest('User password is required.');
    }

    return passport.authenticate('local-signup', (err, user, token) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new errors.Unauthorized());
      }

      return res.apiSuccess({
        user: user,
        token: `JWT ${token}`
      });
    })(req, res, next);
  }

  /*function hasPermission(req, res, next) {
    if (req.user.userType === library.enums.UserType.Restaurant) {
      next();
    } else {
      next(new errors.Forbidden());
    }
  }*/

  function logout(req, res, next) {
    req.logOut();
    req.session.destroy();
    res.status(200).json({});
  }

  return {
    init,
    isAuthenticated,
    passIdentity,
    hasAuthentication,
    login,
    register,
    //hasPermission,
    logout
  };
};
