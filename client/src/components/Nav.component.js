import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Navbar
   */
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo">Document Management System</div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={this.props.isHomeActive}>
              {isAuthenticated
                ? <a href="/app/document">Document</a>
                : <a href="/app/home">Home</a>
              }
            </li>
            <li className={this.props.isLoginActive}>
              {isAuthenticated
                ? <a href="/app/profile" >Profile</a>
                : <a href="/app/login">Login</a>
              }
            </li>
            <li className={this.props.isSignupActive}>
              {isAuthenticated
                ? <a href="/app/logout" >Logout</a>
                : <a href="/app/signup">Signup</a>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  isHomeActive: React.PropTypes.string.isRequired,
  isLoginActive: React.PropTypes.string.isRequired,
  isSignupActive: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
