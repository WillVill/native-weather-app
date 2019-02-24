import { Location } from 'expo';

// Get location on human readable terms. city, country...
const getLocation = ({latitude, longitude}) => {
  return Location.reverseGeocodeAsync({latitude, longitude});
}

// Get mobiles geo location
// wrap async with Promise to make it more resuable
const getGeoLocation = () => {
  return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
  });
}

const getUserLocation = () => {
  return getGeoLocation()
  .then(position => {
    return getLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
  });
}

export { getUserLocation };