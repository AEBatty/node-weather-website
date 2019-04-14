const request = require('request')

const forecast = (latitude, longitude, callback) => {
    var token = '8eda0b86c5471f9a88500c1f94e6df64'
    // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    const url = 'https://api.darksky.net/forecast/' + token + '/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.daily === undefined) {
            callback('Darksky API Token invalid, contact Admin', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + changeFtoC(body.currently.temperature) + ' degress out. With a lowest temperature of ' + changeFtoC(body.daily.data[0].temperatureMin) + ', and a highest temperature of ' + changeFtoC(body.daily.data[0].temperatureMax) + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

var changeFtoC = (temperatureInF) => {
    var temperaturInC = (temperatureInF- 32)*(5/9)
    return temperaturInC.toFixed(2)
}

module.exports = forecast