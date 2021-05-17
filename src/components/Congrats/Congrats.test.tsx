import { mount, ReactWrapper } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';
import Congrats from './Congrats';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';

/**
 * Factory function to create a ReactWrapper for the Congrats component.
 * @function setup
 * @param props - Context values specific to this setup
 * @returns {ReactWrapper}
 */
const setup = ({
  success = false,
  language = 'en',
}: {
  success?: boolean;
  language?: string;
}): ReactWrapper =>
  mount(
    <LanguageContext.Provider value={language}>
      <SuccessContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </SuccessContext.SuccessProvider>
    </LanguageContext.Provider>
  );

describe('languagePicker', () => {
  test('correctly renders congrats string in english by default', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });

  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.text()).toBe('🎯🎉');
  });
});

test('renders without error', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test('renders no text when `success` props is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});

test('renders non-empty congrats message when `succees`', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});
