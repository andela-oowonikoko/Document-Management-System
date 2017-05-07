import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../app/models/index';
import Helper from '../Helper/Helper';

dotenv.config();

const secretKey = process.env.SECRETKEY;

const Authentication = {
  /**
   * Verify user token
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next move to next controller handler
   * @returns {void} no returns
   */
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401)
            .send({
              message: 'The token you supplied has expired'
            });
        }
        db.User.findById(decoded.userId)
          .then((user) => {
            if (!user) {
              return res.status(404)
                .send({
                  message: 'Account not found, Sign Up or sign in to get access'
                });
            }
            if (!user.active) {
              return res.status(401)
                .send({
                  message: 'Please sign in to access your account'
                });
            }
            req.tokenDecode = decoded;
            req.tokenDecode.roleId = user.roleId;
            next();
          });
      });
    } else {
      res.status(400)
        .send({
          message: 'Please sign in or register to get a token'
        });
    }
  },
  getToken(user) {
    const userToken = jwt.sign({
      userId: user.id
    },
      secretKey, { expiresIn: '7d' }
    );
    return userToken;
  },
  /**
   * Get a single user's profile
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getSingleUser(req, res, next) {
    db.User
      .findOne({
        where: { id: req.params.id },
      })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.getUser = user;
        next();
      })
      .catch(err => res.status(500).send(err.errors));
  },
  /**
   * Get a single user's document
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getSingleDocument(req, res, next) {
    db.Documents
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: 'This document cannot be found'
            });
        }
        if (!Helper.isPublic(document) && !Helper.isOwnerDoc(document, req)
           && !Helper.isAdmin(req.tokenDecode.rolesId)
           && !Helper.hasRoleAccess(document, req)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to view this document'
            });
        }
        req.singleDocument = document;
        next();
      })
      .catch(error => res.status(500).send(error.errors));
  },
  /**
   * Get a single user's document after searching by title
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getDocumentByTitle(req, res, next) {
    db.Documents
      .findOne({
        where: { title: { $iLike: `%${req.query.q}%` } },
      })
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: 'This document cannot be found'
            });
        }
        if (!Helper.isPublic(document) && !Helper.isOwnerDoc(document, req)
           && !Helper.isAdmin(req.tokenDecode.rolesId)
           && !Helper.hasRoleAccess(document, req)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to view this document'
            });
        }
        req.singleDocument = document;
        next();
      })
      .catch(error => res.status(500).send(error.errors));
  },
  /**
   * Get a single user's profile
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getUserName(req, res, next) {
    db.User
      .findOne({
        where: { username: req.query.q },
      })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.getUser = user;
        next();
      })
      .catch(err => res.status(500).send(err.errors));
  },
  /**
   * Checks if title is present in the request body
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  checkTitle(req, res, next) {
    db.Roles.findById(req.params.id)
      .then(() => {
        if (!req.body.title) {
          return res.status(400)
            .send({
              message: 'Please input a value to update role with'
            });
        }
        next();
      });
  },
  /**
   * Check for role edit and delete permission
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  modifyRolePermission(req, res, next) {
    db.Roles.findById(req.params.id)
      .then((roles) => {
        if (!roles) {
          return res.status(404)
            .send({
              message: 'This role does not exist'
            });
        }
        if (Helper.isAdmin(roles.id) || Helper.isRegular(roles.id)) {
          return res.status(403)
            .send({
              message: 'You are not permitted to modify this role'
            });
        }
        req.roleInstance = roles;
        next();
      });
  }
};

export default Authentication;
