
function getLocationData(position, callback) {
  const locationData = { lat: position.coords.latitude, lng: position.coords.longitude };
  return () => callback(locationData);
}

export function initialize(callback) {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(callback);
  }
  return alert('Browser does not support GPS');
}
