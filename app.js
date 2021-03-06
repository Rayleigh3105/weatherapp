const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');



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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It´s currently ${weatherResults.temperature}. it feels like ${weatherResults.apparentTemperature}.`)
            }
        });
    }

});

