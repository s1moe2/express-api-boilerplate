const requireRoot = require('app-root-path').require
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Exceptions = requireRoot('/src/util/exceptions')
const { users } = requireRoot('/src/data/repositories')

/*
* Initializes passport with the required strategies.
* */
const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
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

/*
* Passport authentication middleware.
*
* @param {req} Express.js request object.
* @param {req} Express.js response object.
* @param {next} Express.js next middleware function.
* */
const isAuthenticated = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return next(new Exceptions.AuthenticationException())
    }

    // TODO in the future if we need to add more token validations this is the place. Revoked tokens, etc

    req.user = user
    next()
  })(req, res, next)
}

module.exports = {
  init,
  isAuthenticated,
}
