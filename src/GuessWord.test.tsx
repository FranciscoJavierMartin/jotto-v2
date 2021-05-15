import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import App from './App';
import { findByTestAttr } from './test/testUtils';

/**
 * Create wrapper with specified initial conditions
 * then submit a guessed word of 'train'
 * @function
 * @param
 * @returns {ReactWrapper} - Enzyme wrapper of mounted App component
 */
const setup = (state = {}): ReactWrapper => {
  const wrapper: ReactWrapper = mount(<App />);

  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click', { preventDefault() {} });

  return wrapper;
};

describe.skip('no word guessed', () => {
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

describe.skip('some words guessed', () => {
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

describe.skip('guessed secred word', () => {
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
