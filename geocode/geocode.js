const request = require('request');


var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    makeRequest(encodedAddress, callback);

};

var makeRequest = (encodedAddress, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDUdDI-kfI2H8k60OeOFG43sld97V080GE`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.')
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    });
}

module.exports = {
    geocodeAddress,
};

