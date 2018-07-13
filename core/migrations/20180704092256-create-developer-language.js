module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('DevelopersLanguages', {
      developerID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: 'Developers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      languageID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: 'Developers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    queryInterface.dropTable('DevelopersLanguages'),
};