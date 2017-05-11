import axios from 'axios';
import {
  SET_DOCUMENTS,
  ADD_DOCUMENT,
  DOCUMENT_FETCHED,
  DOCUMENT_UPDATED,
  DOCUMENT_DELETED }
from './types';

/**
 * setDocuments
 * @export
 * @param {any} documents
 * @returns {object} object
 */
export function setDocuments(documents) {
  return {
    type: SET_DOCUMENTS,
    documents,
  };
}

/**
 * addDocument
 * @export
 * @param {any} document
 * @returns {object} object
 */
export function addDocument(document) {
  return {
    type: ADD_DOCUMENT,
    document,
  };
}

/**
 * documentFetched
 * @export
 * @param {any} document
 * @returns {object} object
 */
export function documentFetched(document) {
  return {
    type: DOCUMENT_FETCHED,
    document,
  };
}

/**
 * documentUpdated
 * @export
 * @param {any} document
 * @returns {object} object
 */
export function documentUpdated(document) {
  return {
    type: DOCUMENT_UPDATED,
    document,
  };
}

/**
 * documentDeleted
 * @export
 * @param {any} documentId
 * @returns {object} object
 */
export function documentDeleted(documentId) {
  return {
    type: DOCUMENT_DELETED,
    documentId,
  };
}

/**
 * saveDocument
 * @export
 * @param {any} data
 * @returns {object} object
 */
export function saveDocument(data) {
  return (dispatch) => {
    return axios.post('/documents', data)
       .then(response => {
         dispatch(addDocument(response.data));
       })
      .catch(error => {
        throw (error);
      });
  };
}

/**
 * fetchDocuments
 * @export
 * @returns {object} object
 */
export function fetchDocuments() {
  return (dispatch) => {
    return axios.get('/documents')
    .then(res => res.data)
    .then((data) => {
      dispatch(setDocuments(data.documents.rows));
    });
  };
}

/**
 * fetchDocument
 * @export
 * @param {any} id
 * @returns {object} object
 */
export function fetchDocument(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}/documents`)
      .then(res => res.data)
      .then((data) => {
        dispatch(setDocuments(data.userDocuments.documents.rows));
      });
  };
}

/**
 * updateDocument
 * @export
 * @param {any} data
 * @returns {object} object
 */
export function updateDocument(data) {
  return (dispatch) => {
    return axios.put(`/documents/${data.id}`, data)
      .then(res => {
        res.data;
        window.location = '/app/mydocument';
      })
      .then(data => dispatch(documentUpdated(data)));
  };
}

/**
 * deleteDocument
 * @export
 * @param {any} id
 * @returns {object} object
 */
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`)
      .then(res => {
        res.data;
        Materialize.toast(res.data.message, 4000, 'rounded');
      })
      .then(data => dispatch(documentDeleted(id)))
      .catch((err) => {
        Materialize.toast(err.response.data.message, 4000, 'rounded');
      });
  };
}
