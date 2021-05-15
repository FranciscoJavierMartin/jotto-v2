import { actionTypes } from '../actions';
import successReducer from './successReducer';

test('return `true` for action type CORRECT_TYPE', () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});
