import { ADD_FLASH_MESSAGE } from './types';

/**
 * addFlashMessage
 * @export
 * @param {any} message
 * @returns {object} object
 */
export default function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
