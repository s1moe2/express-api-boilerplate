const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');

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
    if (user.changed('password')) {
      let salt, hash;
      salt = await bcrypt.genSalt(12);
      hash = await bcrypt_p.hash(user.password, salt);

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

  User.prototype.comparePassword = async function (password) {
    return await bcrypt_p.compare(password, this.password);
  };

  User.prototype.comparePasswordSync = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};