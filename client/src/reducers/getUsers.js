import { SET_USERS, USER_UPDATED, USER_DELETED } from '../actions/types';

/**
 * @export
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {object} object
 */
export default function getUsers(state = [], action = {}) {
  switch (action.type) {
    case USER_UPDATED:
      return state.map((item) => {
        if (item.id === action.document.id) return action.user;
        return item;
      });
    case USER_DELETED:
      return state.filter(item => item.id !== action.userId);
    case SET_USERS:
      return action.users;
    default: return state;
  }
}
