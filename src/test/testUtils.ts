import { ReactWrapper, ShallowWrapper } from 'enzyme';
import { createStore } from 'redux';

import rootReducer from '../reducers';

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

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * @function storeFactor
 * @param initialState - Initial state for store
 * @returns {Store} - Redux Store
 */
export const storeFactory = (initialState: any) =>
  createStore(rootReducer, initialState);
