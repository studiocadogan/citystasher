import {
  HOME_GET_STASHPOINTS_BEGIN,
  HOME_GET_STASHPOINTS_SUCCESS,
  HOME_GET_STASHPOINTS_FAILURE,
  HOME_GET_STASHPOINTS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../http';


export function getStashpoints(query) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_STASHPOINTS_BEGIN,
    });

    return get(`stashpoints${query ? `?${query}` : ''}`)
      .then(res => dispatch({ type: HOME_GET_STASHPOINTS_SUCCESS, stashpoints: res.data }));
    // .catch(err => dispatch({ type: HOME_GET_STASHPOINTS_FAILURE, errorData: err }));
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetStashpointsError() {
  return {
    type: HOME_GET_STASHPOINTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_STASHPOINTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getStashpointsPending: true,
        getStashpointsError: null,
          stashpointData: []
      };

    case HOME_GET_STASHPOINTS_SUCCESS:
      // The request is success
      return {
        ...state,
        getStashpointsPending: false,
        getStashpointsError: null,
        stashpointData: action.stashpoints
      };

    case HOME_GET_STASHPOINTS_FAILURE:
      // The request is failed
      return {
        ...state,
        getStashpointsPending: false,
        getStashpointsError: action.data.error,
      };

    case HOME_GET_STASHPOINTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getStashpointsError: null,
      };

    default:
      return state;
  }
}
