import { Location } from 'expo';

const getLocation = ({latitude, longitude}) => {
  return Location.reverseGeocodeAsync({latitude, longitude});
}

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