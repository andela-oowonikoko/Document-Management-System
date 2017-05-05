import axios from 'axios';
import { SEARCH_RESULTS } from './types';

/**
 * documentsSearched
 * @export
 * @param {any} documentSearchResult
 * @returns {object} object
 */
export function documentsSearched(documentSearchResult) {
  return {
    type: SEARCH_RESULTS,
    documentSearchResult,
  };
}

/**
 * searchDocuments
 * @export
 * @param {any} queryString
 * @returns {object} object
 */
export function searchDocuments(queryString) {
  return (dispatch) => {
    return axios.get(`/search/documents/?q=${queryString}`)
      .then((res) => {
        dispatch(documentsSearched([res.data.document]));
      });
  };
}

/**
 * searchUsers
 * @export
 * @param {any} queryString
 * @returns {object} object
 */
export function searchUsers(queryString) {
  return (dispatch) => {
    return axios.get(`/search/users/?q=${queryString}`)
      .then((res) => {
        dispatch(documentsSearched([res.data.user]));
      });
  };
}
