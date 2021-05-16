import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Congrats from './components/Congrats/Congrats';
import GuessedWord from './components/GuessedWord/GuessedWord';
import Input from './components/Input/Input';
import { getSecretWord } from './actions';
import { RootState } from './interfaces/state';

function App() {
  const { success, guessedWords, secretWord } = useSelector<
    RootState,
    RootState
  >((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, [dispatch]);

  return (
    <div className='container' data-test='component-app'>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input />
      <GuessedWord guessedWords={guessedWords} />
    </div>
  );
}

export default App;
