import axios from 'axios';

/**
 * @export
 * @param {any} token
 * @returns {void}
 */
export default function setHeader(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
