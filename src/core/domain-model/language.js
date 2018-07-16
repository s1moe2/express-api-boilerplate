module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
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

  Skill.associate = (models) => {
    Skill.belongsToMany(models.Employee, {
      through: models.EmployeeSkill,
      foreignKey:'skillID'
    });
  };

  return Skill;
};