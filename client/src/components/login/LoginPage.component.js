import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Nav.component';
import LoginForm from './LoginForm.component';
import { userLoginRequest } from '../../actions/loginActions';

class LoginPage extends Component {
  render() {
    const userLoginRequest = this.props.userLoginRequest;
    return (
      <div>
        <Navbar isUserActive="" isHomeActive="" isLoginActive="active" isSignupActive="" />
        <LoginForm userLoginRequest={userLoginRequest} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  userLoginRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userLoginRequest })(LoginPage);
