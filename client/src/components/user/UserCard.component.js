import React from 'react';
import { Button } from 'react-materialize';

/**
 * @class UserCard
 * @extends {React.Component}
 */
class UserCard extends React.Component {
  /**
   * Creates an instance of UserCard.
   * @param {any} props
   * @memberOf UserCard
   */
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fistName: '',
      LastName: '',
      username: '',
      email: '',
      rolesId: ''
    };
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf UserCard
   */
  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @return {void}
   * @memberOf UserCard
   */
  onSubmit(event) {
    event.preventDefault();
    const id = event.target.id.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const username = event.target.username.value;
    const email = event.target.title.value;
    const rolesId = event.target.access.value;
    const userDetails = { id, firstName, lastName, username, email, rolesId };

    this.props.updateUser(userDetails).then((res) => {
      this.context.router.history.push('/app/users');
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 4000, 'rounded');
    });
  }

  /**
   * @returns {void}
   * @memberOf DocumentCard
   */
  render() {
    return (
      <div className="col s4">
        <div className="card qBox">
          <div className="card-content white-text">
            <span className="card-title">{this.props.getUser.username}</span>
          </div>
          <div className="card-action">
            <div className="userFirstName">
              <span className="">
                First Name:
                {this.props.getUser.firstName}
              </span>
            </div>
            <div className="userLastName">
              <span className="">
                Last Name:
                {this.props.getUser.lastName}
              </span>
            </div>
            <div className="userEmail">
              <span className="">
                Email:
                {this.props.getUser.email}
              </span>
            </div>
            <div className="userDate">
              <span className="">
                Created At:
                { (this.props.getUser.createdAt) ?
                this.props.getUser.createdAt.split('T')[0] : ''}
              </span>
            </div>
            <Button
              waves="light"
              onClick={() => this.props.deleteUser(this.props.getUser.id)}
              className="btn-floating red darken-2 right"
            >
              <i className="material-icons">delete</i>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = {
  getUser: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired
};

UserCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UserCard;
