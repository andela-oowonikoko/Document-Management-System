import axios from 'axios';
import swal from 'sweetalert';
import { SET_DOCUMENTS, ADD_DOCUMENT, DOCUMENT_FETCHED, DOCUMENT_UPDATED, DOCUMENT_DELETED } from './types';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setDocuments(documents) {
  return {
    type: SET_DOCUMENTS,
    documents,
  };
}
export function addDocument(document) {
  return {
    type: ADD_DOCUMENT,
    document,
  };
}

export function documentFetched(document) {
  return {
    type: DOCUMENT_FETCHED,
    document,
  };
}

export function documentUpdated(document) {
  return {
    type: DOCUMENT_UPDATED,
    document,
  };
}

export function documentDeleted(documentId) {
  return {
    type: DOCUMENT_DELETED,
    documentId,
  };
}

export function saveDocument(data) {
  return (dispatch) => {
    return axios.post('/documents', data)
       .then(response => {
        dispatch(addDocument(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function fetchDocuments() {
  return (dispatch) => {
    return axios.get('/documents')
      .then(res => res.data)
      .then(data => dispatch( setDocuments(data.documents.rows)));
  };
}

export function fetchDocument(id) {
  return (dispatch) => {
    return axios.get(`/documents/${id}`)
      .then(res => res.data)
      .then(data => dispatch(documentFetched(data.document)));
  };
}

export function updateDocument(data) {
  return (dispatch) => {
    return axios.put(`/documents/${data.id}`, data)
      .then(res => {
        res.data;
        window.location = '/app/document';
      })
      .then(data => dispatch(documentUpdated(data)));
  };
}

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
