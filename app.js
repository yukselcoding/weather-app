const request = require('request');
const yargs = require('yargs');


const geocode = require('./geocode');
const forecast = require('./forecast');

const argv = yargs.options({
    address: {
        describe: 'Address of te location',
        demand: true,
        alias: 'address',
        string: true
    }
}).help().alias('help', 'h').argv;



var geocodingResults = geocode.geocodeAddress(argv.address,(errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        forecast.forecastWeather(results.latitude, results.longtitude, (errorMessage, weatherData) => {
            if (errorMessage)
                console.log(errorMessage);
            else
                console.log(JSON.stringify(weatherData, undefined, 2));

        });
    }
});



//1f8ec619819b374498352623771989fa
