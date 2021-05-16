import React, { useEffect } from 'react';
import Congrats from './components/Congrats/Congrats';
import GuessedWord from './components/GuessedWord/GuessedWord';
import Input from './components/Input/Input';
import { IGuessedWord } from './interfaces/guessedWord';
import { getSecretWord } from './actions';
import { actionTypes } from './constants/actionTypes';
import { IAction, RootState } from './interfaces/state';

/**
 * @function reducer to update state, automatically called by dispatch
 * @param {RootState} state - previous state
 * @param {IAction} action - 'type' and 'payload' properties
 * @returns {RootState} - new state
 */
const reducer = (state: RootState, action: IAction): RootState => {
  let res: RootState;

  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      res = {
        ...state,
        secretWord: action.payload,
      };
      break;
    default:
      res = state;
  }

  return res;
};

function App() {
  const success = false;
  const guessedWords: IGuessedWord[] = [];

  const [state, dispatch] = React.useReducer(reducer, { secretWord: '' });

  const setSecretWord = (secretWord: string): void => {
    dispatch({ type: actionTypes.SET_SECRET_WORD, payload: secretWord });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  return state.secretWord ? (
    <div className='container' data-test='component-app'>
      <h1>Jotto</h1>
      <Congrats success={true} />
      <Input success={success} secretWord={state.secretWord} />
      <GuessedWord guessedWords={guessedWords} />
    </div>
  ) : (
    <div className='container' data-test='spinner'>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <p>Loading secret word...</p>
    </div>
  );
}

export default App;
