import React, { Component } from 'react';

/**
 * @class LoginForm
 * @extends {Component}
 */
class LoginForm extends Component {
  /**
   * Creates an instance of LoginForm.
   * @param {any} props
   * @memberOf LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf LoginForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf LoginForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userLoginRequest(this.state).then((res) => {
      this.context.router.history.push('/app/document')
      .then((res) => {
      });
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 4000, 'rounded');
    });
  }
  /**
   * renders the Login component
   * @returns {void}
   * @memberOf Login
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="loginForm">
          <div className="form-control">
            <h1 className="loginHeader">Login</h1>
            <label className="active" htmlFor="email">Email:</label>
            <input
              className="form-control"
              value={this.state.username}
              onChange={this.onChange}
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <div className="form-control">
            <label className="active" htmlFor="password">Password:</label>
            <input
              placeholder="Password"
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
            <button className="loginButton">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLoginRequest: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default LoginForm;
