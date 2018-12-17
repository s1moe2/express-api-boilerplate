const requireRoot = require('app-root-path').require
const Exceptions = requireRoot('/src/util/exceptions')
const { users } = requireRoot('/src/data/repositories')

const getByID = async (userID) => {
  const user = await users.findById(userID)
  if (!user) {
    throw new Exceptions.RecordNotFoundException()
  }

  return user
}

const create = (fields) => {
  return users.createUser(fields)
}

module.exports = {
  getByID,
  create,
}
