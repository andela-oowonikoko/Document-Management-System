import React from 'react';
import { Link } from 'react-router-dom';

export default function DocumentCard({ document, deleteDocument }) {
  return (
    <div className="col s4">
      <div className="card qBox">
        <div className="card-content white-text">
          <span className="card-title">{document.title}</span>
          <p>{document.content}</p>
        </div>
        <div className="card-action">
          <div className="documentDate">
            <span className="">Published: { (document.createdAt) ? document.createdAt.split('T')[0] : ''}</span>
          </div>
          <Link to={`/document/${document.id}`}><i className="material-icons">mode_edit</i></Link>
          <a href="#" onClick={() => deleteDocument(document.id)}>
            <i className="material-icons">delete</i>
          </a>
        </div>
      </div>
    </div>
  );
}

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
};
