const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const { to } = require('await-to-js');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // ====================== Associations

  // ====================== Hooks
  User.beforeSave(async (user, options) => {
    let err;
    if (user.changed('password')) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if(err) {
        throw new Error(err.message);
      }

      [err, hash] = await to(bcrypt_p.hash(user.password, salt));
      if(err) {
        throw new Error(err.message);
      }

      user.password = hash;
    }
  });

  // ====================== Class Methods

  // ====================== Instance methods
  User.prototype.toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName ? this.firstName : undefined,
      lastName: this.lastName ? this.lastName : undefined
    }
  };

  User.prototype.comparePassword = async (password) => {
    let err, pass;
    if(!this.password) {
      throw new Error('password not set');
    }

    [err, pass] = await to(bcrypt_p.compare(password, this.password));

    return (err || !pass) ? false : true;
  };

  User.prototype.getJWT = () => {
    let expiration_time = parseInt(10000 /*CONFIG.jwt_expiration*/);
    return "Bearer "+jwt.sign({ user_id:this.id }, "alsoreplacethis"/*CONFIG.jwt_encryption*/, { expiresIn: expiration_time });
  };

  return User;
};