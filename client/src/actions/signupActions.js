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
 * userSignupRequest
 * @export
 * @param {any} userData
 * @returns {object} object
 */
export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/users', userData)
    .then((res) => {
      Materialize.toast(res.data.message, 4000, 'rounded');
      const token = res.data.token;
      localStorage.setItem('token', token);
      setHeaderToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      window.location = '/app/document';
    });
  };
}
