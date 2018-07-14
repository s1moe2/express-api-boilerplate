module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
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

  Employee.associate = (models) => {
    Employee.belongsTo(models.Company, {
      foreignKey: 'companyID',
    });

    Employee.belongsToMany(models.Skill, {
      through: models.EmployeeSkill,
      foreignKey:'dmployeeID'
    });
  };

  return Employee;
};