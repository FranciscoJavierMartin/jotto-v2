import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';
import { findByTestAttr, storeFactory } from './test/testUtils';
import { RootState } from './interfaces/state';

jest.mock('./actions');

/**
 * Create wrapper with specified initial conditions
 * then submit a guessed word of 'train'
 * @function
 * @param
 * @returns {ReactWrapper} - Enzyme wrapper of mounted App component
 */
const setup = (
  initialState: RootState = {
    success: false,
    secretWord: 'party',
    guessedWords: [],
  }
): ReactWrapper => {
  const store = storeFactory(initialState);
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click', { preventDefault() {} });

  return wrapper;
};

describe('no word guessed', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [],
    });
  });

  test('creates GuessedWords table with one row', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(1);
  });
});

describe('some words guessed', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
    });
  });

  test('add row to guessedWords table', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(2);
  });

  test('displays congrats component', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats');
    expect(congrats.text().length).toBeGreaterThan(0);
  });
});

describe('guessed secred word', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
    });

    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'party' } };
    inputBox.simulate('change', mockEvent);

    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('add row to guessedWords table', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(3);
  });

  test('displays congrats component', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats');
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test('does not display input component contents', () => {
    const inputBox = findByTestAttr(wrapper, 'submit-button');
    expect(inputBox.exists).toBe(false);
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.exists()).toBe(false);
  });
});
