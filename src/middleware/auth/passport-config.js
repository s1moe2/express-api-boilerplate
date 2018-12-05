const requireRoot = require('app-root-path').require
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { users } = requireRoot('/src/services')

const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    users.findByID(jwtPayload._id)
      .then((user) => {
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
      .catch((err) => {
        done(err)
      })
  }))
}

const isAuthenticated = (req, res, next) => {
  return passport.authenticate('jwt', { session: false })(req, res, next)

  // TODO Keeping it simple... No custom authentication callback needed for now
  /* return passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new HttpErrors.Forbidden());
      }

      // TODO in the future if we need to add more token validations this is the place. Revoked tokens, etc

      req.user = user;
      next();
    })(req, res, next); */
}

module.exports = {
  init,
  isAuthenticated
}
