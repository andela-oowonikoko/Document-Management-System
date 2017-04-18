import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Nav.component';
import DocumentForm from './DocumentForm.component';
import { userDocumentRequest } from '../../actions/fetchDocumentAction';

class DocumentPage extends Component {
  render() {
    const userDocumentRequest = this.props.userDocumentRequest;
    return (
      <div>
        <Navbar isHomeActive="active" isLoginActive="" isSignupActive="" />
        <DocumentForm userDocumentRequest={userDocumentRequest} />
      </div>
    );
  }
}

DocumentPage.propTypes = {
  userDocumentRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userDocumentRequest })(DocumentPage);
