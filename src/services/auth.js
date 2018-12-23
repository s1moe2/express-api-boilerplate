const requireRoot = require('app-root-path').require
const jwt = require('jsonwebtoken')
const Exceptions = requireRoot('/src/util/exceptions')

const mailer = require('./mailer')
const { users } = requireRoot('/src/data/repositories')

const authenticate = async (email, password) => {
  const user = await users.findByEmail(email)

  if (!user) {
    throw new Exceptions.RecordNotFoundException()
  }

  if (!user.comparePassword(password)) {
    throw new Exceptions.AuthenticationException()
  }

  return user
}

const sendConfirmation = async (user) => {
  const confirmToken = generateToken(user)
  try {
    if (await mailer.sendSignupConfirmationEmail(user, confirmToken)) {
      user.confirmationToken = confirmToken
      return user.save()
    }
  } catch (err) {
    await user.destroy({ force: true })
    throw new Exceptions.RecordCreationException()
  }
}

const confirmUserSignup = async (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    throw new Exceptions.InvalidTokenException()
  }

  const user = await users.findByConfirmationToken(token)

  if (user) {
    user.confirmationToken = null
    user.isConfirmed = true
    return user.save()
  }

  throw new Exceptions.RecordNotFoundException()
}

const sendRecoveryToken = async (user) => {
  const recoveryToken = generateToken(user, 2)

  await mailer.sendPasswordRecoveryEmail(user, recoveryToken)
  user.recoveryToken = recoveryToken
  return user.save()
}

const checkRecoveryToken = async (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    throw new Exceptions.InvalidTokenException()
  }

  const user = await users.findByRecoveryToken(token)
  if (user) {
    return user
  }

  throw new Exceptions.RecordNotFoundException()
}

const generateToken = (user) => {
  const ttl = process.env.JWT_TTL ? process.env.JWT_TTL : 6

  return jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
    expiresIn: `${ttl}h`,
  })
}

module.exports = {
  authenticate,
  sendConfirmation,
  confirmUserSignup,
  generateToken,
  sendRecoveryToken,
  checkRecoveryToken,
}
