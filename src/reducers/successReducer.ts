import { actionTypes, IAction } from '../actions';
/**
 * @function successReducer
 * @param {boolean} state - Current success state
 * @param {any} action - Action to be reduced
 * @returns {boolean} - new success state
 */
export default function successReducer(
  state: boolean = false,
  action: IAction
): boolean {
  let res: boolean;
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      res = true;
      break;
    default:
      res = state;
  }
  return res;
}
