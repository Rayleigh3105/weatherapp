const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            alias: 'address',
            descripe: 'Address to fetch for',
            string: true
        },
        d: {
            alias: 'default',
            descripe: 'Default address to fetch'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.d === true) {
    argv.address = 'Treuchtlingen'
}
var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDUdDI-kfI2H8k60OeOFG43sld97V080GE`;

axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        debugger;
        throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/8f96db84ab14140a1712e6a1ec8786ca/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);

    return new axios.get(weatherURL)
}).then((response) => {
 var temperature = response.data.currently.temperature;
 var apparentTemperature = response.data.currently.apparentTemperature;
 console.log(`It´s currently ${temperature}. It feels like ${apparentTemperature}.`)
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API Servers');
    } else {
        console.log(e.message);
    }
});





