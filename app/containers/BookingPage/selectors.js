import { createSelector } from 'reselect';

/**
 * Direct selector to the bookingPage state domain
 */
const selectBookingPageDomain = (state) => state.get('bookingPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BookingPage
 */

const makeSelectBookingPage = () => createSelector(
  selectBookingPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectBookingPage;
export {
  selectBookingPageDomain,
};
