import axios from 'axios';
import { SET_USERS, USER_UPDATED, USER_DELETED } from './types';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function userUpdated(user) {
  return {
    type: USER_UPDATED,
    user,
  };
}

export function userDeleted(userId) {
  return {
    type: USER_DELETED,
    userId,
  };
}

export function fetchUsers() {
  return (dispatch) => {
    return axios.get('/users')
      .then(res => res.data)
      .then(data => {
        dispatch(setUsers(data.users.rows));
      });
  };
}

export function updateUser(data) {
  return (dispatch) => {
    return axios.put(`/users/${data.id}`, data)
      .then(res => {
        res.data;
        window.location = '/app/document';
      })
      .then(data => dispatch(userUpdated(data)));
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
      .then(res => {
        res.data;
        Materialize.toast(res.data.message, 4000, 'rounded');
      })
      .then(data => dispatch(userDeleted(id)))
      .catch((err) => {
        Materialize.toast(err.response.data.message, 4000, 'rounded');
      });
  };
}
