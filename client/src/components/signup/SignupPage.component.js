import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Nav.component';
import SignupForm from './SignupForm.component';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends Component {
  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div>
        <Navbar isHomeActive="" isLoginActive="" isSignupActive="active" />
        <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);
