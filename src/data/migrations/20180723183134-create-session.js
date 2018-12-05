module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('Sessions', {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      sess: {
        type: DataTypes.JSON,
        allowNull: false
      },
      expire: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('Sessions')
}
