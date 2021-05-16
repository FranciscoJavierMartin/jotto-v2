import { actionTypes, IAction } from '../actions';
import { IGuessedWord } from '../interfaces/guessedWord';

/**
 * @function guessedWordsReducer
 * @param {Array} state - Array of guessed words.
 * @param {IAction} action - action to be reduced
 * @returns {array} - new guessedWords state.
 */
export default function guessedWordsReducer(
  state: IGuessedWord[] = [],
  action: IAction
) {
  let res: IGuessedWord[];

  switch (action.type) {
    case actionTypes.GUESS_WORD:
      res = [...state, action.payload];
      break;
    default:
      res = state;
  }
  return res;
}
