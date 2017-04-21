import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../common/Nav.component';
import DocumentPage from '../document/DocumentPage.component';

class HomePage extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        UP and running
      </div>
    );
  }
}

HomePage.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(HomePage);
