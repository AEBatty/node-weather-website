const request = require('request')

const geocode = (address, callback) => {
    var token = 'pk.eyJ1IjoiYWxiZXJ0b2JhdHR5IiwiYSI6ImNqdHh2empuaTF1NGM0NW1wbnM4Z29uM2YifQ.Xkdup0hwqnA3TXcPRqLvVw';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + token + '&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features === undefined) {
            callback('Mapbox Token invalid, contact Admin', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode