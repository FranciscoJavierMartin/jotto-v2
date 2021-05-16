import { IAction, actionTypes } from '../actions';

/**
 * @function secretWordReducer
 * @param {string} state - Secret word.
 * @param {IAction} action - action to be reduced
 * @returns {string} - new secret word.
 */
export default function secretWordReducer(
  state: string = '',
  action: IAction
): string {
  let res: string;

  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      res = action.payload;
      break;
    default:
      res = state;
  }

  return res;
}
