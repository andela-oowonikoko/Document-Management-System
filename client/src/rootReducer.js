import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import documents from './reducers/documents';

export default combineReducers({
  auth,
  documents,
  flashMessages
});
