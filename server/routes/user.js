import express from 'express';
import User from '../app/controllers/user';
import Auth from '../app/middlewares/Auth';

const userRouter = express.Router();

// Displays the index page
userRouter.route('/')
  .get((req, res) => {
    res.status(200).send({
      message: 'Welcome to Document Management System API'
    });
  });

// Creates a new user
userRouter.route('/users')
  .get(Auth.verifyToken,
    Auth.validateSearch,
    User.getAll)
  .post(Auth.validateUserInput, User.create);

// Logs a user in
userRouter.route('/users/login')
  .post(Auth.validateLoginInput, User.login);

// Logs a user out
userRouter.route('/users/logout')
  .post(Auth.verifyToken, User.logout);

// Find, Update and Delete user
userRouter.route('/users/:id')
  .get(Auth.verifyToken, Auth.getSingleUser, User.getUser)
  .put(Auth.verifyToken, Auth.validateUserUpdate, User.update)
  .delete(Auth.verifyToken, Auth.validateDeleteUser,
   Auth.hasAdminPermission, User.delete);

// Find all documents belonging to the user.
userRouter.route('/users/:id/documents')
  .get(Auth.verifyToken, Auth.validateSearch, User.findUserDocuments);

// Search for a user
userRouter.route('/search/users/')
  .get(Auth.verifyToken, Auth.getUserName, User.getUserName);

export default userRouter;
