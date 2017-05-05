import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Nav.component';
import ProfileForm from './ProfileForm.component';
import getUser, { updateUser } from '../../actions/profileActions';

/**
 * @class ProfilePage
 * @extends {Component}
 */
class ProfilePage extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Login
   */
  render() {
    return (
      <div>
        <Navbar
          isUserActive=""
          isHomeActive=""
          isDocumentActive=""
          isLoginActive="active"
          isSignupActive=""
        />
        <ProfileForm
          user={this.props.user}
          getUser={this.props.getUser}
          updateUser={this.props.updateUser}
        />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: React.PropTypes.number.isRequired,
  getUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired
};

/**
 * @param {any} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user.userId,
  };
}

export default connect(mapStateToProps, { getUser, updateUser })(ProfilePage);
