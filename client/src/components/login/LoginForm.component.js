import React, { Component } from 'react';
import swal from 'sweetalert';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userLoginRequest(this.state).then((res) => {
      this.context.router.history.push('/app/document')
      .then((res) => {
      })
    }).catch((err) => {
        swal({
          title: 'Error!',
          text: err.response.data.message,
          type: 'error',
          confirmButtonColor: '#18aa8d',
          confirmButtonText: 'Ok',
          closeOnConfirm: false,
          html: false
        });
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
            <input
              className="form-control"
              value={this.state.username}
              onChange={this.onChange}
              name="email"
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <div className="form-control">
            <input
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
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
