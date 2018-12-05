module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('EmployeeSkill', {
      developerID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: 'Employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      languageID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: 'Skills',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('EmployeeSkill')
}
