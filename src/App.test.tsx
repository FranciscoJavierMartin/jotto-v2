import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from './test/testUtils';
import App from './App';

/**
 * Setup function for App component
 * @returns {ShallowWrapper}
 */
const setup = (): ShallowWrapper => shallow(<App />);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent).toHaveLength(1);
});
