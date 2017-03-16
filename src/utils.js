const geocoder = new window.google.maps.Geocoder();
const STAUTS_GEOCODER_OK = window.google.maps.GeocoderStatus.OK;

const geocodePromisify = callback => (...args) => new Promise((resolve, reject) => {
  callback(...args, (results, status) => {
    if (status !== STAUTS_GEOCODER_OK) {
      reject(status);
    }

    resolve(results);
  });
});

export const geocode = geocodePromisify(geocoder.geocode);
export const geocodeByAddress = address => geocodePromisify(geocoder.geocode)({ address });
export const geocodeByPlaceId = placeId => geocodePromisify(geocoder.geocode)({ placeId });
