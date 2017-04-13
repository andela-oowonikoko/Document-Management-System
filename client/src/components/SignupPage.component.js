import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from './Nav.component';
import SignupForm from './SignupForm.component';
import { userSignupRequest } from '../actions/signupActions';

class SignupPage extends Component {
  render() {
    const userSignupRequest = this.props.userSignupRequest;
    return (
      <div>
        <Navbar isHomeActive="" isLoginActive="" isSignupActive="active" />
        <SignupForm userSignupRequest={userSignupRequest} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(SignupPage);
