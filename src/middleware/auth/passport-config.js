//const LocalStrategy = require('passport-local').Strategy;
//const Exceptions = require('../../util/exceptions');
//const Op = require('sequelize').Op;


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = (passport, orm) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    orm.User.findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
  }));
};


/*module.exports = (passport, orm) => {

  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function(email, password, done) {
      orm.User.findOne({
        where: {
          email: {
            [Op.eq]: email
          }
        }
      }).then((user) => {
        if (!user) {
          done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.comparePasswordSync(password)) {
          done(null, false, { message: 'Incorrect password.' });
        }
        done(null, 'TOKEN');
      }).catch((err) => {
        done(err);
      });
    }));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await orm.User.findById(id);

      if (user) {
        done(null, user.toJSON());
      }
    } catch(err) {
      done(new Exceptions.AuthenticationException());
    }
  });
};*/