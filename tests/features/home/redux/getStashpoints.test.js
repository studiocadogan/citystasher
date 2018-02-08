import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_GET_STASHPOINTS_BEGIN,
  HOME_GET_STASHPOINTS_SUCCESS,
  HOME_GET_STASHPOINTS_FAILURE,
  HOME_GET_STASHPOINTS_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  getStashpoints,
  dismissGetStashpointsError,
  reducer,
} from 'src/features/home/redux/getStashpoints';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getStashpoints', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getStashpoints succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getStashpoints())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_STASHPOINTS_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_STASHPOINTS_SUCCESS);
      });
  });

  it('dispatches failure action when getStashpoints fails', () => {
    const store = mockStore({});

    return store.dispatch(getStashpoints({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_STASHPOINTS_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_STASHPOINTS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetStashpointsError', () => {
    const expectedAction = {
      type: HOME_GET_STASHPOINTS_DISMISS_ERROR,
    };
    expect(dismissGetStashpointsError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_GET_STASHPOINTS_BEGIN correctly', () => {
    const prevState = { getStashpointsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_STASHPOINTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getStashpointsPending).to.be.true;
  });

  it('handles action type HOME_GET_STASHPOINTS_SUCCESS correctly', () => {
    const prevState = { getStashpointsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_STASHPOINTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getStashpointsPending).to.be.false;
  });

  it('handles action type HOME_GET_STASHPOINTS_FAILURE correctly', () => {
    const prevState = { getStashpointsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_STASHPOINTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getStashpointsPending).to.be.false;
    expect(state.getStashpointsError).to.exist;
  });

  it('handles action type HOME_GET_STASHPOINTS_DISMISS_ERROR correctly', () => {
    const prevState = { getStashpointsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_STASHPOINTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getStashpointsError).to.be.null;
  });
});
