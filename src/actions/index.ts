import axios from 'axios';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
};

/**
 * @function correctGuess
 * @returns {object} - Action object with type 'CORRECT_GUESS'
 */
export function correctGuess() {
  return {};
}

export const getSecretWord = async (): Promise<string> => {
  return axios.get('http://localhost:3030').then((response) => response.data);
};
