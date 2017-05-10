import db from '../../app/models/index';
import Helper from '../Helper/Helper';

const getData = {
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
        where: { username: { $iLike: `%${req.query.q}%` } },
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
  }
};

export default getData;
