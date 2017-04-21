import React from 'react';
import UserCard from './UserCard.component';

export default function UserList({ getUsers, deleteUser, updateUser }) {
  const emptyMessage = (
    <p>There are no users.</p>
  );

  const userList = (
    <div className="row">
      {getUsers.map(getUser => <UserCard getUser={getUser} key={getUser.id} deleteUser={deleteUser} updateUser={updateUser} />)}
    </div>
  );

  return (
    <div>
      {getUsers.length === 0 ? emptyMessage : userList}
    </div>
  );
}

UserList.propTypes = {
  getUsers: React.PropTypes.array.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired
};
