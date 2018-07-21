const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=AIzaSyDUdDI-kfI2H8k60OeOFG43sld97V080GE',
    json: true
}, (error, response, body) => {
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);

})