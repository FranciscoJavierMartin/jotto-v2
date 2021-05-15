import axios from 'axios';

export enum actionTypes {
  CORRECT_GUESS = 'CORRECT_GUESS',
}

export interface IAction {
  type: actionTypes;
  payload?: any;
}

/**
 * @function correctGuess
 * @returns {object} - Action object with type 'CORRECT_GUESS'
 */
export function correctGuess() {
  return { type: actionTypes.CORRECT_GUESS };
}

export const getSecretWord = async (): Promise<string> => {
  return axios.get('http://localhost:3030').then((response) => response.data);
};
