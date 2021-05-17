import React, { useEffect } from 'react';
import Congrats from './components/Congrats/Congrats';
import GuessedWord from './components/GuessedWord/GuessedWord';
import Input from './components/Input/Input';
import LanguagePicker from './components/LanguagePicker/LanguagePicker';
import { IGuessedWord } from './interfaces/guessedWord';
import { getSecretWord } from './actions';
import { actionTypes } from './constants/actionTypes';
import { IAction, RootState } from './interfaces/state';
import LanguageContext from './contexts/LanguageContext';
import SuccessContext from './contexts/SuccessContext';
import GuessedWordsContext from './contexts/GuessedWordsContext';

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
    case actionTypes.SET_LANGUAGE:
      res = {
        ...state,
        language: action.payload,
      };
      break;
    default:
      res = state;
  }

  return res;
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: '',
    language: 'en',
  });

  const setSecretWord = (secretWord: string): void => {
    dispatch({ type: actionTypes.SET_SECRET_WORD, payload: secretWord });
  };

  const setLanguage = (language: string) => {
    dispatch({ type: actionTypes.SET_LANGUAGE, payload: language });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  return state.secretWord ? (
    <div className='container' data-test='component-app'>
      <h1>Jotto</h1>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <GuessedWordsContext.GuessedWordsProvider>
          <SuccessContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </SuccessContext.SuccessProvider>
          <GuessedWord />
        </GuessedWordsContext.GuessedWordsProvider>
      </LanguageContext.Provider>
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
