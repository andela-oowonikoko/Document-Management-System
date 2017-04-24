import React, { Component } from 'react';

class SideNav extends Component {
  /**
   * renders the SideNav component
   * @returns {void}
   * @memberOf SideNav
   */
  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav fixed">
          <li className={this.props.isCreatedocActive}>
            <a href="/app/createdocument">Create Document</a>
          </li>
          <li className={this.props.isViewdocActive}>
            <a href="/app/viewdocuments">View Documents</a>
          </li>
        </ul>
      </div>
    );
  }
}

SideNav.defaultProps = {
  isCreatedocActive: 'active',
  isViewdocActive: ''
};

export default SideNav;
