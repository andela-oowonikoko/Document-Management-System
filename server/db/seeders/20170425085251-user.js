const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        username: 'seunkoko',
        firstName: 'Oluwaseun',
        lastName: 'Owonikoko',
        email: 'seunowonikoko@gmail.com',
        password: bcrypt.hashSync('owonikoko', bcrypt.genSaltSync(8)),
        rolesId: '1',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'yettyperry',
        firstName: 'Yetunde',
        lastName: 'Owonikoko',
        email: 'yetundeowonikoko@gmail.com',
        password: bcrypt.hashSync('owonikoko', bcrypt.genSaltSync(8)),
        rolesId: '2',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
