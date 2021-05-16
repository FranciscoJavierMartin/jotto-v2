import { actionTypes } from '../constants/actionTypes';

export interface RootState {
  secretWord: string;
  language: string;
}

export interface IAction {
  type: actionTypes;
  payload?: any;
}
