module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Roles.hasMany(models.User, { foreignKey: 'rolesId' });
      }
    }
  });
  return Roles;
};
