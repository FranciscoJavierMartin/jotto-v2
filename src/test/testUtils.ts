import { ReactWrapper, ShallowWrapper } from 'enzyme';

/**
 * Return node(s) with the given data-test attribute
 * @function findByTestAttr
 * @param {ShallowWrapper | ReactWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper | ReactWrapper}
 */
export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper,
  val: string
): ShallowWrapper | ReactWrapper => wrapper.find(`[data-test='${val}']`);
