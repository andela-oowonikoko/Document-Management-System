import axios from 'axios';
import jwt from 'jsonwebtoken';
import setHeaderToken from '../utils/setHeaderToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setHeaderToken(false);
    dispatch(setCurrentUser({}));
  };
}

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
