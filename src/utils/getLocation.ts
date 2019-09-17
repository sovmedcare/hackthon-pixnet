const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDVf0O42E1rjtZVTWdnZ3FrkrdE8e5nFXs',
  Promise: Promise
})

function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}

const getLocation = async () => {
  const { coords } = await getCurrentPosition() as any
  const { latitude, longitude } = coords
  console.log(latitude, longitude)
  const result = await googleMapsClient.reverseGeocode({
    latlng: [latitude, longitude],
    language: 'zh_tw'
  }).asPromise()
  const locationText = result.json.plus_code.compound_code.split('台灣')[1]
  return locationText
}

export default getLocation