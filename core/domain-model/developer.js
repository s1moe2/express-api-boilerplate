module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define('Developer', {
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
    companyID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
  });

  Developer.associate = (models) => {
    Developer.belongsTo(models.Company, {
      foreignKey: 'companyID',
    });

    Developer.belongsToMany(models.Language, {
      through: models.DeveloperLanguage,
      foreignKey:'developerID'
    });
  };

  return Developer;
};