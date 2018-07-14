module.exports = (sequelize, DataTypes) => {
  const EmployeeSkill = sequelize.define('EmployeeSkill', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    employeeID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    skillID: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  });

  EmployeeSkill.associate = (models) => {
    EmployeeSkill.belongsTo(models.Employee, {
      foreignKey: 'employeeID',
    });
    EmployeeSkill.belongsTo(models.Skill, {
      foreignKey: 'skillID',
    });
  };

  return EmployeeSkill;
};