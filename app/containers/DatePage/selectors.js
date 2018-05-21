import { createSelector } from 'reselect';

/**
 * Direct selector to the datePage state domain
 */
const selectDatePageDomain = (state) => state.get('datePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DatePage
 */

const makeSelectDatePage = () => createSelector(
  selectDatePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectDatePage;
export {
  selectDatePageDomain,
};
