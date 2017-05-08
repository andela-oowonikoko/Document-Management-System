import React, { Component } from 'react';

/**
 * @class SignupForm
 * @extends {Component}
 */
class SignupForm extends Component {
  /**
   * Creates an instance of SignupForm.
   * @param {any} props
   * @memberOf SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf SignupForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf SignupForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state).then((res) => {
      this.props.addFlashMessage({
        type: 'success',
        text: 'You have signed up succesfully'
      });
      this.context.router.history.push('/app/document');
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 4000, 'rounded');
    });
  }

  /**
   * @returns {object} object
   * @memberOf SignupForm
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="loginForm">
          <div className="form-control">
            <h1 className="loginHeader">Sign Up</h1>
            <label className="active" htmlFor="username">Username:</label>
            <input
              value={this.state.username}
              onChange={this.onChange}
              type="text"
              id="username"
              name="username"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <label className="active" htmlFor="firstName">First Name:</label>
            <input
              value={this.state.firstName}
              onChange={this.onChange}
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <label className="active" htmlFor="lastName">Last Name:</label>
            <input
              value={this.state.lastName}
              onChange={this.onChange}
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <label className="active" htmlFor="email">Email:</label>
            <input
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              id="email"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <label className="active" htmlFor="password">Password:</label>
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              id="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <button className="signupButton">
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignupForm;
