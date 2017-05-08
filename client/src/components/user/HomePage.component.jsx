import React from 'react';
import { connect } from 'react-redux';

/**
 * @class HomePage
 * @extends {React.Component}
 */
class HomePage extends React.Component {
  /**
   * @returns {object} object
   * @memberOf HomePage
   */
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

/**
 * @param {any} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(HomePage);
