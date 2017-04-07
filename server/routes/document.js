import express from 'express';
import Documents from '../app/controllers/document';
import Auth from '../app/middlewares/Auth';

const documentRouter = express.Router();

documentRouter.route('/documents')
  .get(Auth.verifyToken,
    Auth.validateSearch,
    Documents.getAll)
  .post(Auth.verifyToken,
    Auth.validateDocumentsInput,
    Documents.create);

documentRouter.route('/documents/:id')
  .get(Auth.verifyToken,
    Auth.getSingleDocument,
    Documents.getDocument)
  .put(Auth.verifyToken,
    Auth.hasDocumentPermission,
    Documents.update)
  .delete(Auth.verifyToken,
    Auth.hasDocumentPermission,
    Documents.delete);

documentRouter.route('/search/documents')
  .get(Auth.verifyToken,
    Auth.getDocumentByTitle,
    Documents.getDocumentByTitle);

export default documentRouter;
