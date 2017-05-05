import axios from 'axios';
import { SET_USERS, USER_UPDATED, USER_DELETED } from './types';

/**
 * setUsers
 * @export
 * @param {any} users
 * @returns {object} object
 */
export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

/**
 * userUpdated
 * @export
 * @param {any} user
 * @returns {object} object
 */
export function userUpdated(user) {
  return {
    type: USER_UPDATED,
    user,
  };
}

/**
 * userDeleted
 * @export
 * @param {any} userId
 * @returns {object} object
 */
export function userDeleted(userId) {
  return {
    type: USER_DELETED,
    userId,
  };
}

/**
 * fetchUsers
 * @export
 * @returns {object} object
 */
export function fetchUsers() {
  return (dispatch) => {
    return axios.get('/users')
      .then(res => res.data)
      .then(data => {
        dispatch(setUsers(data.users.rows));
      });
  };
}

/**
 * updateUser
 * @export
 * @param {any} data
 * @returns {object} object
 */
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

/**
 * deleteUser
 * @export
 * @param {any} id
 * @returns {object} object
 */
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
