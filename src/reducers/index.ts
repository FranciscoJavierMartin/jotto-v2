import { combineReducers } from 'redux';
import { RootState } from '../interfaces/state';
import success from './successReducer';
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';

export default combineReducers<RootState>({
  secretWord,
  success,
  guessedWords,
});
