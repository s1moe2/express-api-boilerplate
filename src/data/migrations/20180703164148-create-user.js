module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('Users', {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    })
  },
  down: function (queryInterface, DataTypes) {
    return queryInterface.dropTable('Users')
  },
}
