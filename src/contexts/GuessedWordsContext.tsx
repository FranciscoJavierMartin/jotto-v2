import React from 'react';
import { IGuessedWord } from '../interfaces/guessedWord';

const GuessedWordsContext = React.createContext<
  [IGuessedWord[], React.Dispatch<React.SetStateAction<IGuessedWord[]>>]
>([[], () => {}]);

/**
 * @function useGuessedWords
 * @returns {Array} - guessedWordsContext value, which is a state of [value, setter]
 */
export function useGuessedWords() {
  return React.useContext(GuessedWordsContext);
}

/**
 * @function GuessedWordsProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
export function GuessedWordsProvider(props: any) {
  const [guessedWords, setGuessedWords] = React.useState<IGuessedWord[]>([]);

  const value = React.useMemo(
    () => [guessedWords, setGuessedWords],
    [guessedWords]
  );

  return <GuessedWordsContext.Provider value={value} {...props} />;
}

export default { GuessedWordsProvider, useGuessedWords };
