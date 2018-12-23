const bcrypt = require('bcrypt-promise')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
    },
    confirmationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recoveryToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  // ====================== Associations

  // ====================== Hooks
  User.beforeSave(async (user, options) => {
    if (user.changed('password') || user.changed('confirmationToken') || user.changed('recoveryToken')) {
      const salt = await bcrypt.genSalt(12)
      user.password = await bcrypt.hash(user.password, salt)
    }
  })

  // ====================== Class Methods

  // ====================== Instance methods
  User.prototype.toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName ? this.firstName : undefined,
      lastName: this.lastName ? this.lastName : undefined,
    }
  }

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  User.prototype.compareConfirmationToken = function (token) {
    return bcrypt.compare(token, this.confirmationToken)
  }

  User.prototype.compareRecoveryToken = function (token) {
    return bcrypt.compare(token, this.recoveryToken)
  }

  return User
}
