
import { fromJS } from 'immutable';
import bookingPageReducer from '../reducer';

describe('bookingPageReducer', () => {
  it('returns the initial state', () => {
    expect(bookingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
