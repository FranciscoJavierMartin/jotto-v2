import { getLetterMatchCount } from '../helpers';
import axios from 'axios';

export enum actionTypes {
  CORRECT_GUESS = 'CORRECT_GUESS',
  GUESS_WORD = 'GUESS_WORD',
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

export const getSecretWord = async (): Promise<string> => {
  return axios.get('http://localhost:3030').then((response) => response.data);
};
