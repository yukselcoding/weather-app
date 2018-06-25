const request = require('request');
const yargs = require("yargs");

const argv = yargs
    .options({
        address: {
            describe: "Address of te location",
            demand: true,
            alias: "address",
            string: true
        }
    })
    .help()
    .alias("help", "h").argv;


var encodedAddress = encodeURIComponent(argv.address);



var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=APIKEY`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to google servers!');
            } else if (body.status === 'ZERO_RESULTS') {
                reject("Error Occured! - Unable to find data!!");
            } else {
                resolve({
                    address: response.body.results[0].formatted_address,
                    latitude: response.body.results[0].geometry.location.lat,
                    longtitude: response.body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress(encodedAddress).then((location) => {
    console.log("ADDRESS -- LATITUDE -- LONGTITUDE");
    console.log(JSON.stringify(location, undefined, 2));
    return new Promise((resolve, reject) => {
        request({
            url: ` https://api.darksky.net/forecast/APIKEY/${location.latitude},${location.longtitude}`,
            json: true
        }, (error, response, body) => {
            if (error)
                reject('Unable to connect darksky.net servers!');
            else if (response.statusCode === 400)
                reject('Unable to fetch weather data!');
            else {
                resolve({
                    temperature: convertCelcius(body.currently.temperature),
                    apparentTemperature: convertCelcius(body.currently.apparentTemperature)
                });
            }

        });
    })
}).then((weatherData) => {
    console.log("TEMPERATURE INFO");
    console.log(JSON.stringify(weatherData, undefined, 2));
}).catch((e) => {
    console.log(e);
});



var convertCelcius = (temperature) => {
    return ((temperature - 32) * (5 / 9)).toFixed(2);
} 
