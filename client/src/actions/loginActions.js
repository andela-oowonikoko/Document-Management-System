import axios from 'axios';
import jwt from 'jsonwebtoken';
import setHeaderToken from '../utils/setHeaderToken';
import { SET_CURRENT_USER } from './types';

/**
 * setCurrentUser
 * @export
 * @param {any} user
 * @returns {object} object
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * logout
 * @export
 * @returns {func} function
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setHeaderToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 * userLoginRequest
 * @export
 * @param {any} userData
 * @returns {object} object
 */
export function userLoginRequest(userData) {
  return (dispatch) => {
    return axios.post('/users/login', userData)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        setHeaderToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        Materialize.toast(res.data.message, 4000, 'rounded');
      });
  };
}
