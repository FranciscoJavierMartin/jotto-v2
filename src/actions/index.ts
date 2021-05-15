import axios from 'axios';

export const getSecretWord = async (): Promise<string> => {
  return axios.get('http://localhost:3030').then((response) => response.data);
};
