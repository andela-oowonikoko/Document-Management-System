import React from 'react';
import MyDocumentCard from './MyDocumentCard.component';

/**
 * @export
 * @param {any} documents, deleteDocument, updateDocument, currentUser
 * @returns {object} object
 */
export default function MyDocumentList(
  { documents, deleteDocument, updateDocument, currentUser }) {
  const emptyMessage = (
    <p className="qBox1">
      <strong>There are no documents yet in your collection.</strong>
    </p>
  );

  const documentsList = (
    <div className="row">
      {documents.map(document =>
        <MyDocumentCard
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

MyDocumentList.propTypes = {
  documents: React.PropTypes.array.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired
};
