import React, { Component } from 'react';
import Navbar from './Nav.component';

class Index extends Component {
  /**
   * renders the index component
   * @returns {void}
   * @memberOf Index
   */
  render() {
    return (
      <Navbar isHomeActive="active" isLoginActive="" isSignupActive="" />
    );
  }
}
export default Index;
