const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=APIKEY`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to google servers!');
        } else if(body.status === 'ZERO_RESULTS') {
            callback("Error Occured! - Unable to find data!!");  
        } else {
            callback(undefined, {
                address: response.body.results[0].formatted_address,
                latitude: response.body.results[0].geometry.location.lat,
                longtitude: response.body.results[0].geometry.location.lng 
            });
        }
    });
};

module.exports = {
    geocodeAddress
}
