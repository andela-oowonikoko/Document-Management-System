import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Nav.component';
import CreateDocument from './CreateDocument.component';
import { saveDocument } from '../../actions/documentActions';

class CreateDocumentPage extends Component {
  render() {
    const saveDocument = this.props.saveDocument;
    return (
      <div>
        <Navbar isUserActive="" isHomeActive="" isDocumentActive="active" isLoginActive="" isSignupActive="" />
        <CreateDocument saveDocument={saveDocument} />
      </div>
    );
  }
}

CreateDocumentPage.propTypes = {
  saveDocument: React.PropTypes.func.isRequired
};

export default connect(null, { saveDocument })(CreateDocumentPage);
