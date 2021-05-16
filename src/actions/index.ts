import axios from 'axios';

export const getSecretWord = async (
  setSecretWord: (secretWord: string) => void
): Promise<void> => {
  try {
    const response = await axios.get('http://localhost:3030');
    // setSecretWord(response.data);
  } catch (error) {
  } finally {
    setSecretWord('party');
  }
};
