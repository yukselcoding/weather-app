const request = require('request');

var forecastWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/APIKEY/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error) 
            callback('Unable to connect darksky.net servers!');
        else if(response.statusCode === 400)
            callback('Unable to fetch weather data!');
        else {
            callback(undefined, {
                temperature: convertCelcius(body.currently.temperature),
                apparentTemperature: convertCelcius(body.currently.apparentTemperature)
            });
        }
        
    });
}

var convertCelcius = (temperature) => {
    return ((temperature-32)*(5/9)).toFixed(2);
} 

module.exports = {
    forecastWeather
}
