import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';
import Input from './Input';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';
import GuessedWordsContext from '../../contexts/GuessedWordsContext';

const mockSetCurrentGuess = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState: any) => [initialState, mockSetCurrentGuess],
}));

/**
 * Factory function to create a ReactWrapper for the Input component.
 * @function setup
 * @param {object} testValues - Context and props specific to this setup
 * @returns {ReactWrapper}
 */
const setup = ({
  language = 'en',
  success = false,
  secretWord = 'party',
}: {
  language?: string;
  success?: boolean;
  secretWord?: string;
}): ReactWrapper =>
  mount(
    <LanguageContext.Provider value={language}>
      <SuccessContext.SuccessProvider value={[success, jest.fn()]}>
        <GuessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </GuessedWordsContext.GuessedWordsProvider>
      </SuccessContext.SuccessProvider>
    </LanguageContext.Provider>
  );

describe('render', () => {
  describe('success is true', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = setup({ success: true });
    });

    test('Input renders without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('input box does not show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(false);
    });

    test('submit button does not show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(false);
    });
  });

  describe('success is false', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = setup({ success: false });
    });

    test('Input renders without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('input box shows', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(true);
    });

    test('submit button shows', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(true);
    });
  });
});

describe('state controlled input field', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = setup({});
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});

describe('languagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: 'en' });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('Submit');
  });

  test('correctly renders submit string in emoji', () => {
    const wrapper = setup({ language: 'emoji' });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('🚀');
  });
});
