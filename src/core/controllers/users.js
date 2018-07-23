const Op = require('sequelize').Op;
const Exceptions = require('../../util/exceptions');


module.exports = (orm) => {

  // public
  async function getAll() {
    return await orm.User.findAll();
  }

  // public
  async function getByID(userID) {
    const user = await orm.User.findById(userID);
    if (!user) {
      throw new Exceptions.RecordNotFoundException();
    }

    return user;
  }

  async function getByEmail(email) {
    const user = await orm.User.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });

    return user;
  }

  // public
  async function authenticate(email, password) {
    const user = await getByEmail(email);

    if (!user) {
      throw new Exceptions.RecordNotFoundException();
    }

    if (!user.comparePassword(password)) {
      throw new Exceptions.AuthenticationException();
    }

    return user.toJSON();
  }

  // public
  async function create(fields) {
    let user = await getByEmail(fields.email);
    if(user) {
      throw new Exceptions.RecordAlreadyExistsException();
    }

    user = await orm.User.create(fields);
    if (!user) {
      throw new Exceptions.RecordCreationException();
    }

    return user.toJSON();
  }

  return {
    authenticate,
    getByID,
    create
  };
};