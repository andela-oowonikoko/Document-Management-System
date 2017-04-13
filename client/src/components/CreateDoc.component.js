import React, { Component } from 'react';
import SideNav from './SideNav.component';

class CreateDoc extends Component {
  /**
   * renders the CreateDoc component
   * @returns {void}
   * @memberOf CreateDoc
   */
  render() {
    return (
      <div>
        <SideNav isCreatedocActive="active" isViewdocActive="" />
      </div>
    );
  }
}

export default CreateDoc;
