import request from 'supertest';
import chai from 'chai';
import app from '../../../server';
import db from '../../app/models/';
import helper from '../helper/test.helper';

const superRequest = request.agent(app);
const expect = chai.expect;

let newAdminUser;
let adminToken;
let regularToken;
let regularUser;
const emptyValue = ['username', 'lastName', 'firstName', 'password', 'email'];
const uniqueField = ['username', 'email'];

describe('User API', () => {
  before((done) => {
    db.Roles
    .bulkCreate([{ title: 'admin', id: 1 }, { title: 'regular', id: 2 }])
    .then((role) => {
      helper.adminUser.rolesId = role[0].id;
      db.User.create(helper.adminUser)
        .then((admin) => {
          newAdminUser = admin.dataValues;
          done();
        });
    });
  });

  after(() => {
    db.Roles.destroy({ where: {} });
  });

  describe('New Users', () => {
    describe('Create User', () => {
      it('should create a user', (done) => {
        superRequest.post('/users')
          .send(helper.regularUser)
          .end((error, response) => {
            regularUser = response.body.user;
            expect(response.status).to.equal(201);
            expect(response.body.user.username)
              .to.equal(helper.regularUser.username);
            expect(response.body.user.email)
              .to.equal(helper.regularUser.email);
            done();
          });
      });

      uniqueField.forEach((field) => {
        const uniqueUser = Object.assign({}, helper.firstUser);
        uniqueUser[field] = helper.regularUser[field];
        it(`should fail when already existing ${field} is supplied`, (done) => {
          superRequest.post('/users')
            .send(uniqueUser)
            .end((err, res) => {
              expect(res.status).to.equal(409);
              expect(res.body.message).to
                .equal(`${field} already exists`);
              done();
            });
        });
      });

      emptyValue.forEach((field) => {
        const invalidUser = Object.assign({}, helper.secondUser);
        invalidUser[field] = '';
        it(`should fail when ${field} is invalid`, (done) => {
          superRequest.post('/users')
            .send(invalidUser)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to
                .equal(`Enter a valid ${field}`);
              done();
            });
        });
      });

      it('should fail if password is less than 8', (done) => {
        superRequest.post('/users')
          .send(helper.invalidPasswordUser)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message)
              .to.equal('Minimum of 8 characters is allowed for password');
            done();
          });
      });

      it('should not allow admin user to sign up', (done) => {
        helper.firstUser.rolesId = 1;
        superRequest.post('/users')
          .send(helper.firstUser)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to
              .equal('Permission denied, You cannot sign up as an admin user');
            done();
          });
      });
    });
  });

  describe('Existing users', () => {
    describe('Login, /users/login', () => {
      it('should allow admin user to login', (done) => {
        superRequest.post('/users/login')
          .send(helper.adminUser)
          .end((err, res) => {
            adminToken = res.body.token;
            expect(res.status).to.equal(200);
            expect(res.body.token).to.not.equal(null);
            expect(res.body.message).to
              .equal('You have successfully logged in');
            done();
          });
      });

      it('should allow regular users to login', (done) => {
        superRequest.post('/users/login')
          .send(helper.regularUser)
          .end((err, res) => {
            regularToken = res.body.token;
            expect(res.status).to.equal(200);
            expect(res.body.token).to.not.equal(null);
            expect(res.body.message).to
              .equal('You have successfully logged in');
            done();
          });
      });

      it('should not allow unregistered users to login', (done) => {
        superRequest.post('/users/login')
          .send(helper.firstUser)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Please enter a valid email or password to log in');
            done();
          });
      });

      it('should not allow login with invalid password', (done) => {
        superRequest.post('/users/login')
          .send({ email: newAdminUser.email, password: 'invalid' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Please enter a valid email or password to log in');
            done();
          });
      });

      it('should not allow login when email and password is not provided',
      (done) => {
        superRequest.post('/users/login')
          .send({ })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to
              .equal('Please provide your email and password to login');
            done();
          });
      });
    });

    describe('Get all users, GET /users ', () => {
      it('should return verification failed if no token is supply', (done) => {
        superRequest.get('/users')
          .set({ })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to
              .equal('Please sign in or register to get a token');
            done();
          });
      });

      it('should return invalid token if token is invalid', (done) => {
        superRequest.get('/users')
          .set({ 'x-access-token': 'invalid-access-token' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('The token you supplied has expired');
            done();
          });
      });

      it(`should return users own profile, 
      when the requester is a regular user`, (done) => {
        superRequest.get('/users')
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
              .equal('You have successfully retrived all users');
            expect(res.body.users.rows[0].username).to
              .equal(helper.regularUser.username);
            done();
          });
      });

      it(`should return all users profile, 
      when the requester is an admin user`, (done) => {
        superRequest.get('/users')
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
              .equal('You have successfully retrived all users');
            done();
          });
      });
    });

    describe('Get user by Id, GET /users/:id', () => {
      it('should return verification failed for unregistered user', (done) => {
        superRequest.get(`/users/${newAdminUser.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to
              .equal('Please sign in or register to get a token');
            done();
          });
      });

      it('should return user\'s profile when valid user\'s id is supplied',
      (done) => {
        superRequest.get(`/users/${newAdminUser.id}`)
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.user).to.not.equal(null);
            expect(res.body.user.id).to.equal(newAdminUser.id);
            expect(res.body.user.email).to.equal(newAdminUser.email);
            done();
          });
      });

      it('should return not found for invalid user id', (done) => {
        superRequest.get('/users/9999')
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('This user does not exist');
            done();
          });
      });
    });
  });
});
