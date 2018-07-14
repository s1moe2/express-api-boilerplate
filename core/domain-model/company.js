module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    timestamps: true,

    paranoid: true,

    /*defaultScope: {
      where: {
        isDeleted: false
      }
    },*/

    scopes: {
      deleted: {
        where: {
          deleted: true
        }
      }
    },

    /*instanceMethods: {
      toSimpleJSON: () => {
        return {
          id: this.id,
          name: this.companyName
        }
      }
    }*/
  });

  Company.associate = (models) => {
    Company.hasMany(models.Employee, {
      foreignKey: 'companyID'
    });
  };

  return Company;
};