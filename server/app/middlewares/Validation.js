import db from '../../app/models/index';
import Helper from '../Helper/Helper';

const Validation = {
  /**
   * Validate user's input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateUserInput(req, res, next) {
    if (req.body.rolesId && req.body.rolesId === 1) {
      return res.status(403)
        .send({
          message: 'Permission denied, You cannot sign up as an admin user'
        });
    }
    let username = /^[a-zA-Z0-9]+$/.test(req.body.username);
    let firstName = /^[a-zA-Z0-9]+$/.test(req.body.firstName);
    let lastName = /^[a-zA-Z0-9]+$/.test(req.body.lastName);
    let email = /\S+@\S+\.\S+/.test(req.body.email);
    let password = /\w+/g.test(req.body.password);

    if (!username) {
      return res.status(400)
        .send({
          message: 'Enter a valid username'
        });
    }
    if (!firstName) {
      return res.status(400)
        .send({
          message: 'Enter a valid firstname'
        });
    }
    if (!lastName) {
      return res.status(400)
        .send({
          message: 'Enter a valid lastname'
        });
    }
    if (!email) {
      return res.status(400)
        .send({
          message: 'Enter a valid email'
        });
    }
    if (!password) {
      return res.status(400)
        .send({
          message: 'Enter a valid password'
        });
    }
    if (req.body.password && req.body.password.length < 8) {
      return res.status(400)
        .send({
          message: 'Minimum of 8 characters is allowed for password'
        });
    }

    db.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          return res.status(409)
            .send({
              message: 'email already exists'
            });
        }
        db.User.findOne({ where: { username: req.body.username } })
          .then((newUser) => {
            if (newUser) {
              return res.status(409)
                .send({
                  message: 'username already exists'
                });
            }
            username = req.body.username;
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            email = req.body.email;
            password = req.body.password;
            const rolesId = req.body.roleId || 2;
            req.userInput =
            { username, firstName, lastName, rolesId, email, password };
            next();
          });
      });
  },
  /**
   * Validate user's login datas
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateLoginInput(req, res, next) {
    if (!req.body.password || !req.body.email) {
      return res.status(400)
        .send({
          message: 'Please provide your email and password to login'
        });
    }

    const email = /\S+@\S+\.\S+/.test(req.body.email);
    const password = /\w+/g.test(req.body.password);

    if (!email || !password) {
      return res.status(400)
        .send({
          message: 'Please enter a valid email and password'
        });
    }
    next();
  },
  /**
   * Validate search
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateSearch(req, res, next) {
    const query = {};
    const terms = [];
    const userQuery = req.query.query;
    const searchArray =
      userQuery ? userQuery.toLowerCase().match(/\w+/g) : null;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const publishedDate = req.query.publishedDate;
    const order =
      publishedDate && publishedDate === 'ASC' ? publishedDate : 'DESC';

    if (limit < 0 || !/^([1-9]\d*|0)$/.test(limit)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for limit value'
        });
    }
    if (offset < 0 || !/^([1-9]\d*|0)$/.test(offset)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for offset value'
        });
    }

    if (searchArray) {
      searchArray.forEach((word) => {
        terms.push(`%${word}%`);
      });
    }
    query.limit = limit;
    query.offset = offset;
    query.order = [['createdAt', order]];

    if (`${req.baseUrl}${req.route.path}` === '/users/search') {
      if (!req.query.query) {
        return res.status(400)
          .send({
            message: 'Please enter a search query'
          });
      }
      query.where = {
        $or: [
          { username: { $iLike: { $any: terms } } },
          { firstName: { $iLike: { $any: terms } } },
          { lastName: { $iLike: { $any: terms } } },
          { email: { $iLike: { $any: terms } } }
        ]
      };
    }
    if (`${req.baseUrl}${req.route.path}` === '/users/') {
      query.where = Helper.isAdmin(req.tokenDecode.rolesId)
        ? {}
        : { id: req.tokenDecode.userId };
    }
    if (`${req.baseUrl}${req.route.path}` === '/documents/search') {
      if (!req.query.query) {
        return res.status(400)
          .send({
            message: 'Please enter a search query'
          });
      }
      if (Helper.isAdmin(req.tokenDecode.rolesId)) {
        query.where = Helper.likeSearch(terms);
      } else {
        query.where = {
          $and: [Helper.docAccess(req), Helper.likeSearch(terms)]
        };
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/documents') {
      if (Helper.isAdmin(req.tokenDecode.rolesId)) {
        query.where = {};
      } else {
        query.where = Helper.docAccess(req);
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/users/:id/documents') {
      const adminSearch = req.query.query ? Helper.likeSearch(terms) : { };
      const userSearch = req.query.query
        ? [Helper.docAccess(req), Helper.likeSearch(terms)]
        : Helper.docAccess(req);
      if (Helper.isAdmin(req.tokenDecode.roleId)) {
        query.where = adminSearch;
      } else {
        query.where = userSearch;
      }
    }
    req.dmsFilter = query;
    next();
  },
  /**
   * Validate user's input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateUserUpdate(req, res, next) {
    if (!(Helper.isAdmin(req.tokenDecode.rolesId) || Helper.isOwner(req))) {
      return res.status(401)
        .send({
          message: 'You are not permitted to update this profile'
        });
    }
    if (!!req.body.rolesId && req.body.rolesId === '1') {
      if (!Helper.isAdmin(req.tokenDecode.rolesId)) {
        return res.status(403)
          .send({
            message: 'You are not permitted to update role to admin'
          });
      }
    }
    if (req.body.id) {
      return res.status(403)
        .send({
          message: 'You are not permitted to update your id'
        });
    }
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.userInstance = user;
        next();
      });
  },
  /**
   * Validate user to delete, make sure it not admin user
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateDeleteUser(req, res, next) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        if (Helper.isAdmin(user.rolesId) && user.id === 1) {
          return res.status(403)
            .send({
              message: 'You can not delete the default admin user'
            });
        }
        req.userInstance = user;
        next();
      });
  },
  /**
   * Validate documents input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  validateDocumentsInput(req, res, next) {
    const title = /\w+/g.test(req.body.title);
    const content = /\w+/g.test(req.body.content);
    if (!req.body.title) {
      return res.status(400)
        .send({
          message: 'Title field is required'
        });
    }
    if (!req.body.content) {
      return res.status(400)
        .send({
          message: 'Content field is required'
        });
    }
    if (!title) {
      return res.status(400)
        .send({
          message: 'Please enter a valid title'
        });
    }
    if (!content) {
      return res.status(400)
        .send({
          message: 'Please enter a valid content'
        });
    }
    if (req.body.access
      && !['public', 'private'].includes(req.body.access)) {
      return res.status(400)
        .send({
          message: 'Access type can only be public or private'
        });
    }
    req.docInput = {
      title: req.body.title,
      content: req.body.content,
      ownerId: req.tokenDecode.userId,
      access: req.body.access,
      ownerRoleId: req.tokenDecode.roleId
    };
    next();
  }
};

export default Validation;
