import { actionTypes } from '../constants/actionTypes';

export interface RootState {
  secretWord: string;
}

export interface IAction {
  type: actionTypes;
  payload?: any;
}
