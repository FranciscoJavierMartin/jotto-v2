import { combineReducers } from 'redux';
import { RootState } from '../interfaces/state';
import success from './successReducer';

export default combineReducers<RootState>({
  success,
});
