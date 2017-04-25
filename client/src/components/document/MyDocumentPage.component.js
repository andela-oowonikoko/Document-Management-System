import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Nav.component';
import MyDocumentList from './MyDocumentList.component';
import { deleteDocument, updateDocument, fetchDocument } from '../../actions/documentActions';
import Search from '../common/Search.component';
import { searchDocuments } from '../../actions/searchActions';

class MyDocumentPage extends React.Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchDocument(this.props.auth.user.userId);
  }

  handleSearch(e) {
    e.preventDefault();
    const query = e.target.value;
    this.setState({ query });
    this.props.searchDocuments(query);
  }

  render() {
    const documentSearchResult = this.props.search;
    const renderedDocuments = this.state.query.trim().length > 0
      ? documentSearchResult : this.props.documents;

    return (
      <div>
        <Navbar isUserActive="" isHomeActive="" isDocumentActive="active" isLoginActive="" isSignupActive="" />
        <div>
          <div className="row">
            <div className="col s7 push-s4">
              <Search onChange={this.handleSearch} />
            </div>
            <div className="col s5 pull-s7 btnViewDocuments">
              <Link className="btn create-list-link hero-btn" to="/app/createdocument">
                Add Document
              </Link>
            </div>
          </div>
          <MyDocumentList
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

MyDocumentPage.propTypes = {
  documents: React.PropTypes.array.isRequired,
  fetchDocument: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  searchDocuments: React.PropTypes.func.isRequired,
  userId: React.PropTypes.number.isRequired,
  auth: React.PropTypes.object.isRequired
};

MyDocumentPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
    search: state.search,
    userId: state.auth.user.userId,
    auth: state.auth
  };
}

export default connect(mapStateToProps, { deleteDocument, updateDocument, searchDocuments, fetchDocument })(MyDocumentPage);
