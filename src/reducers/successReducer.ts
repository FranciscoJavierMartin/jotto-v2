import { actionTypes } from '../actions';
/**
 * @function successReducer
 * @param {boolean} state - Current success state
 * @param {object} action - Action to be reduced
 * @returns {boolean} - new success state
 */
export default (state: boolean = false, action: any) => {
  let res: boolean;
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      res = true;
      break;
    default:
      res = state;
  }
  return res;
};
