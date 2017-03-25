module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Documents, { foreignKey: 'ownerId' });
        User.belongsTo(models.Roles, {
          foreignKey: 'rolesId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return User;
};
