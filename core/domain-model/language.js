module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  });

  Language.associate = (models) => {
    Language.belongsToMany(models.Developer, {
      through: models.DeveloperLanguage,
      foreignKey:'languageID'
    });
  };

  return Language;
};