const requireRoot = require('app-root-path').require
const Op = require('sequelize').Op
const Exceptions = requireRoot('/src/util/exceptions')

const UsersRepository = (orm) => {

  const findByID = (userID) => {
    return orm.User.findByPk(userID)
  }

  const findByEmail = (email) => {
    return orm.User.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    })
  }

  const findByConfirmationToken = (token) => {
    return orm.User.findOne({
      where: {
        confirmationToken: {
          [Op.eq]: token,
        },
      },
    })
  }

  const findByRecoveryToken = (token) => {
    return orm.User.findOne({
      where: {
        recoveryToken: {
          [Op.eq]: token,
        },
      },
    })
  }

  const createUser = async (newUser) => {
    let user = await findByEmail(newUser.email)
    if (user) {
      throw new Exceptions.RecordAlreadyExistsException()
    }

    return orm.User.create(newUser)
  }

  return {
    findByID,
    findByEmail,
    findByConfirmationToken,
    findByRecoveryToken,
    createUser,
  }
}

module.exports = UsersRepository
