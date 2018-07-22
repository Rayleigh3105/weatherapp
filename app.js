const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            descripe: 'Address to fetch for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDUdDI-kfI2H8k60OeOFG43sld97V080GE`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to Google Servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address.')
    } else if (body.status === 'OK') {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    }
});