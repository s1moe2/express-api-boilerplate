const requireRoot = require('app-root-path').require
const HttpStatus = require('http-status-codes')
const { validationResult } = require('express-validator/check')
const Exceptions = requireRoot('/src/util/exceptions')

const { auth } = requireRoot('/src/services')
const { users } = requireRoot('/src/data/repositories')

/**
 * Sign in using email and password.
 * req, res, next params are all required this time (passport requires them). This is an exceptional
 * case.
 */

const signin = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.apiError(new Exceptions.InvalidParametersException({ errors: errors.array() }))
  }

  try {
    const user = await auth.authenticate(req.body.email, req.body.password)

    // if user is found and password is right create a token
    const token = auth.generateToken(user)

    // return the token
    return res.apiSuccess({ token: `Bearer ${token}` })
  } catch (err) {
    return res.apiError(err)
  }
}

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.apiError(new Exceptions.InvalidParametersException({ errors: errors.array() }))
  }

  try {
    const user = await users.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    })

    await auth.sendConfirmation(user)
    return res.apiSuccess('Successful created new user.', HttpStatus.CREATED)
  } catch (err) {
    return res.apiError(err)
  }
}

const confirm = async (req, res, next) => {
  const confirmed = await auth.checkConfirmationToken(req.query.token)

  if (confirmed) {
    return res.apiSuccess('Successful confirmed user registration.', HttpStatus.OK)
  }

  return res.apiError('Could not confirm the user.', HttpStatus.BAD_REQUEST)
}

module.exports = {
  signin,
  signup,
  confirm,
}
