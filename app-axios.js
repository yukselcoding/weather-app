const request = require("request");
const yargs = require("yargs");
const axios = require("axios");

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

var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyASYOdcNPZjnVcB8rlKQNnWmvuvZqWzzFs`;

axios.get(geocodeURL).then((response) => {

    if(response.data.status === 'ZERO_RESULTS')
        throw new Error('Unable to find data.');

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    var weatherURL = `https://api.darksky.net/forecast/1f8ec619819b374498352623771989fa/${lat},${lng}`;

    console.log('Address: ', response.data.results[0].formatted_address);
    return axios.get(weatherURL);
})
.then((response) => {
   
    console.log('Temperature: ', convertCelcius(response.data.currently.temperature));
    console.log("Apparent Temperature: ", convertCelcius(response.data.currently.apparentTemperature));
})
.catch((e) =>{
    if(e.code === 'ENOTFOUND')
        console.log('Unable to connect API servers.');
    else 
        console.log(e.message);
});
    

var convertCelcius = (temperature) => {
    return ((temperature - 32) * (5 / 9)).toFixed(2);
} 