import { expect } from 'chai';

import {
  HOME_SET_LOCATION,
} from 'src/features/home/redux/constants';

import {
  setLocation,
  reducer,
} from 'src/features/home/redux/setLocation';

describe('home/redux/setLocation', () => {
  it('returns correct action by setLocation', () => {
    expect(setLocation()).to.have.property('type', HOME_SET_LOCATION);
  });

  it('handles action type HOME_SET_LOCATION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_LOCATION }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
