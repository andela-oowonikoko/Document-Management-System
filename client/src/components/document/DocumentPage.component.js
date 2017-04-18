import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentsList from './DocumentList.component';
import Navbar from '../common/Nav.component';
import { fetchDocuments, deleteDocument } from '../../actions/documentActions';
import Search from '../common/Search.component';

class DocumentPage extends React.Component {
  componentDidMount() {
    this.props.fetchDocuments();
  }

  handleSearch() {

  }
 
  render() {
    return (
      <div>
        <Navbar isHomeActive="active" isLoginActive="" isSignupActive="" />
        <div>
          <h1>Documents List</h1>
          <div className="row">
            <div className="col s7 push-s4">
              <Search onChange={this.handleSearch} />
            </div>
            <div className="col s5 pull-s7">
              <Link className="btn create-list-link hero-btn" to="document">
                Add Document
              </Link>
            </div>
          </div>
          <DocumentsList
            documents={this.props.documents}
            deleteDocument={this.props.deleteDocument}
          />
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  documents: React.PropTypes.array.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
  };
}

export default connect(mapStateToProps, { fetchDocuments, deleteDocument })(DocumentPage);
