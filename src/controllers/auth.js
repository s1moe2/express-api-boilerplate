const requireRoot = require('app-root-path').require
const HttpStatus = require('http-status-codes')
const { validationResult } = require('express-validator/check')
const Exceptions = requireRoot('/src/util/exceptions')

const { users, auth } = requireRoot('/src/services')

/**
 * Sign in using email and password.
 * req, res, next params are all required this time (passport requires them). This is an exceptional
 * case.
 */

const signin = async (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.apiError(new Exceptions.InvalidParametersException({ errors: errors.array() }))
    }

    try {
      const user = await auth.authenticate(req.body.email, req.body.password)

      // if user is found and password is right create a token
      const token = auth.generateToken(user, process.env.JWT_TTL)

      // return the token
      return res.apiSuccess({ token: `Bearer ${token}` })
    } catch (err) {
      return res.apiError(err)
    }
  })
}

const signup = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.apiError(new Exceptions.InvalidParametersException({ errors: errors.array() }))
    }

    try {
      const user = await users.createUser({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      })

      try {
        await auth.sendConfirmation(user)
        return res.apiSuccess('Successful created new user.', HttpStatus.CREATED)
      } catch (err) {
        return res.apiError(err)
      }
    } catch (err) {
      return res.apiError(err)
    }
  })
}

const confirm = async (token) => {
  return auth.checkConfirmationToken(token)
}

module.exports = {
  signin,
  signup,
  confirm
}
