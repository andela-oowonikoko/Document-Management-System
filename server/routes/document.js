import express from 'express';
import Documents from '../app/controllers/document';
import Authentication from '../app/middlewares/Authentication';
import Validation from '../app/middlewares/Validation';
import hasPermission from '../app/middlewares/hasPermission';
import getData from '../app/middlewares/getData';

const documentRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   NewDocument:
 *     type: object
 *     required:
 *       - title
 *       - content
 *       - access
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       access:
 *         type: string
 *   Document:
 *     allOf:
 *       - $ref: '#/definitions/NewDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
documentRouter.route('/documents')
  /**
   * @swagger
   * /documents:
   *   get:
   *     description: Returns documents
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *      - name: x-access-token
   *        in: header
   *        description: an authorization header
   *        required: true
   *        type: string
   *     responses:
   *       200:
   *         description: documents
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Document'
   */

  /**
   * @swagger
   * /documents:
   *   post:
   *     description: Creates new document
   *     tags:
   *      - Create
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: document
   *         description: Document object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewDocument'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Document'
   */
  .get(Authentication.verifyToken,
    Validation.validateSearch,
    Documents.getAll)
  .post(Authentication.verifyToken,
    Validation.validateDocumentsInput,
    Documents.create);

/**
 * @swagger
 * definitions:
 *   NewDocUpdate:
 *     type: object
 *     required:
 *       - title
 *       - content
 *       - access
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       access:
 *         type: string
 *   DocUpdate:
 *     allOf:
 *       - $ref: '#/definitions/NewDocUpdate'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
documentRouter.route('/documents/:id')
  /**
   * @swagger
   * /documents/{id}:
   *   get:
   *     description: Returns a particular document
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The document's id
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/DocUpdate'
   */

  /**
   * @swagger
   * /documents/{id}:
   *   put:
   *     description: Updates the document of the user signed in
   *     tags:
   *      - Update
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: id
   *          description: The document's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *        - name: document
   *          description: User object
   *          in:  body
   *          required: true
   *          type: string
   *          schema:
   *            $ref: '#/definitions/NewDocUpdate'
   *     responses:
   *       200:
   *         description: documents
   *         schema:
   *           $ref: '#/definitions/DocUpdate'
   */

  /**
   * @swagger
   * /documents/{id}:
   *    delete:
   *      description: Deletes the document with the id supplied as param
   *      tags:
   *        - Delete
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: The document's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: documents
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/DocUpdate'
   */
  .get(Authentication.verifyToken,
    getData.getSingleDocument,
    Documents.getDocument)
  .put(Authentication.verifyToken,
    hasPermission.hasDocumentPermission,
    Documents.update)
  .delete(Authentication.verifyToken,
    hasPermission.hasDocumentPermission,
    Documents.delete);

/**
 * @swagger
 * definitions:
 *   NewSearchDocument:
 *     type: object
 *   SearchDocument:
 *     allOf:
 *       - $ref: '#/definitions/NewSearchDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
documentRouter.route('/search/documents')
  /**
   * @swagger
   * /search/documents/?q={document_title}:
   *   get:
   *     description: Returns the documents that matches the title
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: document_title
   *         description: The document's title
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: documents
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/SearchDocument'
   */
  .get(Authentication.verifyToken,
    getData.getDocumentByTitle,
    Documents.getDocumentByTitle);

export default documentRouter;
