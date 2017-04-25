import React from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';
import { browserHistory } from 'react-router';

class UserCard extends React.Component {
  constructor (props) {
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

  onChange(e) {
    return this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    const id = e.target.id.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const username = e.target.username.value;
    const email = e.target.title.value;
    const rolesId = e.target.access.value;
    const userDetails = { id, firstName, lastName, username, email, rolesId };

    this.props.updateUser(userDetails).then((res) => {
      this.context.router.history.push('/app/users');
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 4000, 'rounded');
    });
  }

  /**
   * @returns void
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
                { (this.props.getUser.createdAt) ? this.props.getUser.createdAt.split('T')[0] : ''}
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
