import { SEARCH_RESULTS } from '../actions/types';

/**
 * @export
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {object} object
 */
export default function documents(state = [], action = {}) {
  switch (action.type) {
    case SEARCH_RESULTS:
      return action.documentSearchResult;
    default: return state;
  }
}
