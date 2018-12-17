const requireRoot = require('app-root-path').require
const jwt = require('jsonwebtoken')
const orm = requireRoot('/src/data/domain-model')
const Op = require('sequelize').Op
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
  const confirmToken = generateToken(user, 2)
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

const checkConfirmationToken = async (token) => {
  try {
    jwt.verify(token, 'wrong-secret')
  } catch (err) {
    throw new Exceptions.InvalidTokenException()
  }

  const user = await orm.User.findOne({
    where: {
      confirmationToken: {
        [Op.eq]: token,
      },
    },
  })

  if (user) {
    user.confirmationToken = null
    user.isConfirmed = true
    await user.save()
    return true
  }

  throw new Exceptions.RecordNotFoundException()
}

const generateToken = (user, ttl) => {
  return jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
    expiresIn: `${ttl}h`,
  })
}

module.exports = {
  authenticate,
  sendConfirmation,
  checkConfirmationToken,
  generateToken,
}
