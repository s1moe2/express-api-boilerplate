module.exports = (sequelize, DataTypes) => {
  const DeveloperLanguage = sequelize.define('DeveloperLanguage', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    developerID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    languageID: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  });

  DeveloperLanguage.associate = (models) => {
    DeveloperLanguage.belongsTo(models.Developer, {
      foreignKey: 'developerID',
    });
    DeveloperLanguage.belongsTo(models.Language, {
      foreignKey: 'languageID',
    });
  };

  return DeveloperLanguage;
};