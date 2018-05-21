
import { fromJS } from 'immutable';
import datePageReducer from '../reducer';

describe('datePageReducer', () => {
  it('returns the initial state', () => {
    expect(datePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
