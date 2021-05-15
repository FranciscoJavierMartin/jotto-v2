import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';
import Input from './Input';

const mockSetCurrentGuess = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState: any) => [initialState, mockSetCurrentGuess],
}));

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @param props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (
  success: boolean = false,
  secretWord: string = 'party'
): ShallowWrapper =>
  shallow(<Input secretWord={secretWord} success={success} />);

describe('render', () => {
  describe('success is true', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      wrapper = setup(true);
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
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      wrapper = setup(false);
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
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = setup();
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
