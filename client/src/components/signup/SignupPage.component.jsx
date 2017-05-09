import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Nav.component';
import SignupForm from './SignupForm.component';
import { userSignupRequest } from '../../actions/signupActions';

/**
 * @class SignupPage
 * @extends {Component}
 */
class SignupPage extends Component {
  /**
   * @returns {object} object
   * @memberOf SignupPage
   */
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <Navbar
          isUserActive=""
          isHomeActive=""
          isDocumentActive=""
          isLoginActive=""
          isSignupActive="active"
        />
        <SignupForm
          userSignupRequest={userSignupRequest}
        />
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null,
  { userSignupRequest })(SignupPage);
