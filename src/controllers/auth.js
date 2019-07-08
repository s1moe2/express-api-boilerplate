const requireRoot = require('app-root-path').require
const HttpStatus = require('http-status-codes')
const { validationResult } = require('express-validator/check')
const Exceptions = requireRoot('/src/util/exceptions')

const { auth } = requireRoot('/src/services')
const { users } = requireRoot('/src/data/repositories')

const validateRequest = (req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new Exceptions.InvalidParametersException({ errors: errors.array() })
  }
}

const signin = async (req, res, next) => {
  try {
    validateRequest(req)

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
  try {
    validateRequest(req)

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

const confirmSignup = async (req, res, next) => {
  validateRequest(req)

  const confirmed = await auth.confirmUserSignup(req.query.token)

  if (confirmed) {
    return res.apiSuccess('Successful confirmed user registration.', HttpStatus.OK)
  }

  return res.apiError('Could not confirm the user.', HttpStatus.BAD_REQUEST)
}

const recover = async (req, res, next) => {
  validateRequest(req)

  try {
    const user = await users.findByEmail(req.body.email)
    if (!user) {
      return res.apiError(new Exceptions.RecordNotFoundException())
    }

    await auth.sendRecoveryToken(user)
    return res.apiSuccess('Successfully sent recovery token.', HttpStatus.OK)
  } catch (err) {
    return res.apiError(new Exceptions.RecordNotFoundException())
  }
}

const resetPassword = async (req, res, next) => {
  validateRequest(req)

  try {
    const user = await auth.checkRecoveryToken(req.body.token)
    if (!user) {
      return res.apiError(new Exceptions.RecordNotFoundException())
    }

    user.recoveryToken = null
    user.password = req.body.password
    await user.save()

    return res.apiSuccess('Password successfully updated.', HttpStatus.OK)
  } catch (err) {
    return res.apiError(new Exceptions.RecordNotFoundException())
  }
}

module.exports = {
  signin,
  signup,
  confirmSignup,
  recover,
  resetPassword,
}
