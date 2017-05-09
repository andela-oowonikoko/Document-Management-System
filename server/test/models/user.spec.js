import chai from 'chai';
import db from '../../app/models/';
import helper from '../helper/test.helper';

const expect = chai.expect;
describe('User Model', () => {
  const requiredFields = [
    'username',
    'firstName',
    'lastName',
    'email',
    'password'
  ];
  // const uniqueFields = ['username', 'email'];
  const emptyFields = ['firstName', 'lastName'];
  const defaultRoleId = 2;
  let regularUser;

  before((done) => {
    db.Roles.create({ title: 'regular', id: 2 }).then(() => {
      done();
    });
  });
  after((done) => { db.Roles.destroy({ where: {} }); done(); });

  describe('Create user', () => {
    it('should create a user', (done) => {
      db.User.create(helper.regularUser)
        .then((user) => {
          regularUser = user.dataValues;
          expect(user.dataValues.firstName)
            .to.equal(helper.regularUser.firstName);
          expect(user.dataValues.lastName)
            .to.equal(helper.regularUser.lastName);
          expect(user.dataValues.username)
            .to.equal(helper.regularUser.username);
          expect(user.dataValues.email)
            .to.equal(helper.regularUser.email);
          expect(user.dataValues.rolesId)
            .to.equal(defaultRoleId);
          expect(user.dataValues.password)
            .to.not.equal(helper.regularUser.password);
          done();
        });
    });

    it('should not create a user when email is not valid', (done) => {
      db.User.create(helper.invalidEmailUser)
        .then()
        .catch((error) => {
          expect(error.errors[0].message)
            .to.equal('Input a valid email address');
          expect(error.errors[0].type)
            .to.equal('Validation error');
          expect(error.errors[0].path)
            .to.equal('email');
          done();
        });
    });

    it('should not create a user when password character is not up to 8',
    (done) => {
      db.User.create(helper.invalidPasswordUser)
        .then()
        .catch((error) => {
          expect(error.errors[0].message)
            .to.equal('Minimum of 8 characters is required');
          expect(error.errors[0].type)
            .to.equal('Validation error');
          expect(error.errors[0].path)
            .to.equal('validatePassword');
          done();
        });
    });
  });

  describe('Not null violations', () => {
    requiredFields.forEach((field) => {
      it(`should fail when ${field} is null`, (done) => {
        const nullField = Object.assign({}, helper.secondUser);
        nullField[field] = null;
        db.User.create(nullField)
          .then()
          .catch((error) => {
            expect(error.errors[0].message)
              .to.equal(`${field} cannot be null`);
            expect(error.errors[0].type)
              .to.equal('notNull Violation');
            done();
          });
      });
    });
  });

  describe('Empty string violations', () => {
    emptyFields.forEach((field) => {
      it(`should fail when ${field} is empty`, (done) => {
        const emptyField = Object.assign({}, helper.secondUser);
        emptyField[field] = '';
        db.User.create(emptyField)
          .then()
          .catch((error) => {
            expect(error.errors[0].message)
              .to.equal('This field cannot be empty');
            expect(error.errors[0].type)
              .to.equal('Validation error');
            expect(error.errors[0].path)
              .to.equal(field);
            done();
          });
      });
    });
  });

  describe('Logging in', () => {
    let decryptPassword;
    it('should login a user', () => {
      db.User.findOne({ where: { email: regularUser.email } })
        .then((user) => {
          decryptPassword = user.isPasswordValid(helper.regularUser.password);
          expect(decryptPassword)
            .to.be.equal(true);
          expect(user.password)
            .to.not.equal(helper.regularUser.password);
        });
    });
  });

  describe('Update user', () => {
    const updatedUser = {};
    beforeEach((done) => {
      const dataToUpdate = { firstName: 'koko', password: 'newpassword' };
      db.User.findById(regularUser.id)
        .then((user) => {
          user.update(dataToUpdate)
          .then((userToUpdate) => {
            Object.assign(updatedUser, userToUpdate.dataValues);
            done();
          });
        });
    });

    it('ensures password is hashed and data is updated', (done) => {
      db.User.findById(updatedUser.id)
        .then((user) => {
          expect(user.dataValues.password)
            .is.not.equal(regularUser.password);
          expect(user.dataValues.id)
            .to.equal(regularUser.id);
          expect(user.dataValues.firstName)
            .to.not.equal(regularUser.firstName);
          expect(user.dataValues.email)
            .to.equal(regularUser.email);
          done();
        });
    });
  });
});
