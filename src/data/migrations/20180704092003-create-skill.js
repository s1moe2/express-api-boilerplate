module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('Skills', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false
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
        allowNull: true,
        type: DataTypes.DATE
      }
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('Skills')
};