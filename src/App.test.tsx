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

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent).toHaveLength(1);
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
