import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import UserList from './UserList.component';
import Navbar from '../common/Nav.component';
import { searchUsers } from '../../actions/searchActions';
import Search from '../common/Search.component';
import { fetchUsers, deleteUser, updateUser } from '../../actions/userActions';
import paginateUserActions from '../../actions/paginateUserActions';

/**
 * @class UserPage
 * @extends {React.Component}
 */
class UserPage extends React.Component {
  /**
   * Creates an instance of UserPage.
   * @memberOf UserPage
   */
  constructor() {
    super();
    this.state = {
      query: '',
      limit: 9,
      offset: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * @returns {void}
   * @memberOf UserPage
   */
  componentDidMount() {
    // this.props.fetchUsers();
    this.props.paginateUserActions(this.state.offset, this.state.limit);
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf UserPage
   */
  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    this.setState({ query });
    this.props.searchUsers(query);
  }

  /**
   * @returns {object} object
   * @memberOf UserPage
   */
  render() {
    const userSearchResult = this.props.search;
    const renderedUsers = this.state.query.trim().length > 0
      ? userSearchResult : this.props.getUsers;

    return (
      <div>
        <Navbar
          isUserActive="active"
          isHomeActive=""
          isDocumentActive=""
          isLoginActive=""
          isSignupActive=""
        />
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
        <div>
          <center>
            <Pagination
              className="pag"
              items={this.props.pageCount}
              onSelect={(page) => {
                const offset = (page - 1) * 9;
                this.props.paginateUserActions(offset, this.state.limit);
              }}
            />
          </center>
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  getUsers: React.PropTypes.array.isRequired,
  pageCount: React.PropTypes.number.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  paginateUserActions: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  searchUsers: React.PropTypes.func.isRequired
};

UserPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

/**
 * @param {any} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    getUsers: state.pagination.items,
    pageCount: state.pagination.pageCount,
    search: state.search
  };
}

export default connect(mapStateToProps,
  { fetchUsers,
    deleteUser,
    updateUser,
    searchUsers,
    paginateUserActions })(UserPage);
