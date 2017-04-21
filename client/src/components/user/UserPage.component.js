import React from 'react';
import { connect } from 'react-redux';
import UserList from './UserList.component';
import Navbar from '../common/Nav.component';
import { searchUsers } from '../../actions/searchActions';
import Search from '../common/Search.component';
import { fetchUsers, deleteUser, updateUser } from '../../actions/userActions';

class UserPage extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleSearch(e) {
    e.preventDefault();
    const query = e.target.value;
    if (query === '') {
      window.location = '/app/users';
    } else {
      this.props.searchUsers(query);
    }
  }

  render() {
      const userSearchResult = this.props.search;
      const renderedUsers = userSearchResult.length > 0
      ? userSearchResult : this.props.getUsers;

    return (
      <div>
        <Navbar isUserActive="active" isHomeActive="" isLoginActive="" isSignupActive="" />
        <div className="row">
          <div className="col s7 push-s4">
            <Search onChange={this.handleSearch} />
          </div>
        </div>
        <UserList
          getUsers={renderedUsers}
          deleteUser={this.props.deleteUser}
          updateUser={this.props.updateUser}
        />
      </div>
    );
  }
}

UserPage.propTypes = {
  getUsers: React.PropTypes.array.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  searchUsers: React.PropTypes.func.isRequired
};

UserPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    getUsers: state.getUsers,
    search: state.search
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser, updateUser, searchUsers })(UserPage);
