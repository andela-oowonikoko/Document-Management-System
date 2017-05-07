import React from 'react';
import { connect } from 'react-redux';
import DocumentsList from './DocumentList.component';
import Navbar from '../common/Nav.component';
import { fetchDocuments, deleteDocument, updateDocument }
from '../../actions/documentActions';
import { searchDocuments } from '../../actions/searchActions';
import Search from '../common/Search.component';

/**
 * @class DocumentPage
 * @extends {React.Component}
 */
class DocumentPage extends React.Component {
  /**
   * Creates an instance of DocumentPage.
   * @memberOf DocumentPage
   */
  constructor() {
    super();
    this.state = {
      query: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * @returns {void}
   * @memberOf DocumentPage
   */
  componentDidMount() {
    this.props.fetchDocuments();
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf DocumentPage
   */
  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    this.setState({ query });
    this.props.searchDocuments(query);
  }

  /**
   * @returns {object} object
   * @memberOf DocumentPage
   */
  render() {
    const documentSearchResult = this.props.search;
    const renderedDocuments = this.state.query.trim().length > 0
      ? documentSearchResult : this.props.documents;

    return (
      <div>
        <Navbar
          isUserActive=""
          isHomeActive="active"
          isDocumentActive=""
          isLoginActive=""
          isSignupActive=""
        />
        <div>
          <div className="row">
            <div className="col s7 push-s4">
              <Search onChange={this.handleSearch} />
            </div>
          </div>
          <DocumentsList
            documents={renderedDocuments}
            deleteDocument={this.props.deleteDocument}
            updateDocument={this.props.updateDocument}
            currentUser={this.props.auth.user}
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
  updateDocument: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  searchDocuments: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired
};

DocumentPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

/**
 * @param {any} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    documents: state.documents,
    search: state.search,
    auth: state.auth
  };
}

export default connect(mapStateToProps,
  { fetchDocuments,
    deleteDocument,
    updateDocument,
    searchDocuments
  })(DocumentPage);
