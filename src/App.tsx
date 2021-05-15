import React, { useEffect } from 'react';
import Congrats from './components/Congrats/Congrats';
import GuessedWord from './components/GuessedWord/GuessedWord';
import Input from './components/Input/Input';
import { IGuessedWord } from './interfaces/guessedWord';
import { getSecretWord } from './actions';

function App() {
  const success = false;
  const secretWord = 'party';
  const guessedWords: IGuessedWord[] = [];

  useEffect(() => {
    getSecretWord();
  }, []);

  return (
    <div className='container' data-test='component-app'>
      <h1>Jotto</h1>
      <Congrats success={true} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWord guessedWords={guessedWords} />
    </div>
  );
}

export default App;
