import {
  HOME_SET_LOCATION,
} from './constants';

export function setLocation(locationData) {
  return {
    type: HOME_SET_LOCATION,
    locationData: [locationData.coords.latitude, locationData.coords.longitude]
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SET_LOCATION:
      return {
        ...state,
        locationData: action.locationData[1] ? action.locationData : [51.5074, 0.1278]
      };

    default:
      return state;
  }
}
