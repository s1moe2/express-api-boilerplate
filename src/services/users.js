const requireRoot = require('app-root-path').require
const orm = requireRoot('/src/data/domain-model')
const Op = require('sequelize').Op
const Exceptions = requireRoot('/src/util/exceptions')

const findByID = (userID) => {
  return orm.User.findByPk(userID)
}

const findByEmail = (email) => {
  return orm.User.findOne({
    where: {
      email: {
        [Op.eq]: email
      }
    }
  })
}

const createUser = async (newUser) => {
  let user = await findByEmail(newUser.email)
  if (user) {
    throw new Exceptions.RecordAlreadyExistsException()
  }

  user = await orm.User.create(newUser)
  if (!user) {
    throw new Exceptions.RecordCreationException()
  }

  return user
}

module.exports = {
  findByID,
  findByEmail,
  createUser
}
