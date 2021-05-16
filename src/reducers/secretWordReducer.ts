import { IAction } from '../actions';

/**
 * @function secretWordReducer
 * @param {string} state - Secret word.
 * @param {IAction} action - action to be reduced
 * @returns {string} - new secret word.
 */
export default function secretWordReducer(state: string = '', action: IAction) {
  return state;
}
