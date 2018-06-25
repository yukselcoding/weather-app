# weather-app
A weather-app developed using Google Geocode API and DarkSky API

Google Geocode API finds Latitude and Longtitude based on the address information of the location.

Darksky API finds the weather information of the location based on the Latitude and Longtitude information.                     

YARGS, REQUEST, AXIOS libraries are used from npm.

WHAT TO DO?

Goto https://console.developers.google.com/ and enable a Geocoding API key.

https://maps.googleapis.com/maps/api/geocode/json?address=[address]&key=[APIKEY] is the way of usage to make an API request to the google servers.

Goto https://darksky.net/dev and enable a DarkSky API key.

https://api.darksky.net/forecast/[key]/[latitude],[longitude] is the way of usage to make an API request to the DarkSky servers.

Type 'node app.js --address='[address]'' and run the program.
Type 'node app-promise.js --address='[address]'' and run the program.
Type 'node app-axios.js --address='[address]'' and run the program.
