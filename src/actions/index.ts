import { getLetterMatchCount } from '../helpers';
import axios from 'axios';

export enum actionTypes {
  CORRECT_GUESS = 'CORRECT_GUESS',
  GUESS_WORD = 'GUESS_WORD',
  SET_SECRET_WORD = 'SET_SECRET_WORD',
}

export interface IAction {
  type: actionTypes;
  payload?: any;
}

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action
 * @function guessWord
 * @param guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
 */
export const guessWord = (guessedWord: string) => {
  return function (dispatch: any, getState: any) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: {
        guessedWord,
        letterMatchCount,
      },
    });

    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }
  };
};

/**
 * Returns Redux Thunk function that initiates an axios request
 *  and dispatches the response as a 'SET_SECRET_WORD' action
 * @returns {function} - Redux Thunk function
 */
export const getSecretWord = () => {
  return function (dispatch: any) {
    return axios.get('http://localhost:3030').finally(() => {
      dispatch({ type: actionTypes.SET_SECRET_WORD, payload: 'party' });
    });
  };
};
