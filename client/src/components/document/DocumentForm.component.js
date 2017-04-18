import React, { Component } from 'react';

class DocumentForm extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * renders the Login component
   * @returns {void}
   * @memberOf Login
   */
  render() {
    this.props.userDocumentRequest().then((res) => {
      console.log(res.data.documents.rows);
    });
    return (
      <div>
      </div>
    );
  }
}

DocumentForm.propTypes = {
  userDocumentRequest: React.PropTypes.func.isRequired
};

export default DocumentForm;
