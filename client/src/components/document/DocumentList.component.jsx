import React from 'react';
import DocumentCard from './DocumentCard.component';

/**
 * @export
 * @param {object} documents, deleteDocument, updateDocument, currentUser
 * @returns {void}
 */
export default function DocumentsList({
  documents, deleteDocument, updateDocument, currentUser }) {
  const emptyMessage = (
    <p>There are no documents yet in your collection.</p>
  );

  const documentsList = (
    <div className="row">
      {documents.map(document =>
        <DocumentCard
          document={document}
          key={document.id}
          deleteDocument={deleteDocument}
          updateDocument={updateDocument}
          currentUser={currentUser}
        />)}
    </div>
  );

  return (
    <div>
      {documents.length === 0 ? emptyMessage : documentsList}
    </div>
  );
}

DocumentsList.propTypes = {
  documents: React.PropTypes.array.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired
};
