import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestAttr } from '../../test/testUtils';
import GuessedWord from './GuessedWord';
import { IGuessedWord } from '../../interfaces/guessedWord';
import GuessedWordsContext from '../../contexts/GuessedWordsContext';

/**
 * Factory function to create a ReactWrapper for the GuessedWords component.
 * @function setup
 * @param {IGuessedWord[]} guessedWords - GuessedWords value specific to this setup
 * @returns {ReactWrapper}
 */
const setup = (guessedWords: IGuessedWord[] = []): ReactWrapper => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  GuessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return mount(
    <GuessedWordsContext.GuessedWordsProvider>
      <GuessedWord />
    </GuessedWordsContext.GuessedWordsProvider>
  );
};

describe('if there are no words guessed', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup([]);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  test('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper: ReactWrapper;
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ];

  beforeEach(() => {
    wrapper = setup(guessedWords);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });

  test('correct number of guessed words', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsNode.length).toBe(guessedWords.length);
  });
});

describe('languagePicker', () => {
  test('correctly renders guess instructions string in English by default', () => {
    const wrapper = setup();
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toBe('Try to guess the secret word!');
  });

  test('correctly renders guess instructions string in emoji', () => {
    const mockUseContext = jest.fn().mockReturnValue('emoji');
    React.useContext = mockUseContext;
    const wrapper = setup();
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toBe('🤔🤫🔤');
  });
});
