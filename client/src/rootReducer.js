import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import documents from './reducers/documents';
import search from './reducers/search';
import user from './reducers/profile';
import getUsers from './reducers/getUsers';

export default combineReducers({
  auth,
  documents,
  search,
  user,
  getUsers,
  flashMessages
});
