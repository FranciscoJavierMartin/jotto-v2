import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestAttr } from './test/testUtils';
import App from './App';

// activate global mock to make sure getSecretWord does not make network call
jest.mock('./actions');
// eslint-disable-next-line import/first
import { getSecretWord as mockGetSecretWord } from './actions';
/**
 * Setup function for App component
 * @returns {ReactWrapper}
 */
const setup = (): ReactWrapper => mount(<App />);

describe.each([
  [null, true, false],
  ['party', false, true],
])('renders with secretWord as %s', (secretWord, loadingShows, appShows) => {
  let wrapper: ReactWrapper;
  let originalUseReducer: any;

  beforeEach(() => {
    originalUseReducer = React.useReducer;
    const mockUseReducer = jest
      .fn()
      .mockReturnValue([{ secretWord, language: 'en' }, jest.fn()]);
    React.useReducer = mockUseReducer;
    wrapper = setup();
  });

  afterEach(() => {
    React.useReducer = originalUseReducer;
  });

  test(`renders loading spinner: ${loadingShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(loadingShows);
  });

  test(`renders app: ${appShows}`, () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(appShows);
  });
});

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });

  test('get secret word on app mount', () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps({});
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
