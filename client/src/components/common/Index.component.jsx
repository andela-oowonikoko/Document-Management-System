import React, { Component } from 'react';
import Navbar from './Nav.component';
import HomePage from '../user/HomePage.component';

/**
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
  /**
   * renders the index component
   * @returns {void}
   * @memberOf Index
   */
  render() {
    return (
      <div>
        <Navbar
          isUserActive=""
          isHomeActive="active"
          isDocumentActive=""
          isLoginActive=""
          isSignupActive=""
        />
        <HomePage />
      </div>
    );
  }
}
export default Index;
