const https = require('https');
const http = require('http');
const api = require('./api.json');

//Print out temp details
function printWeather(weather) {
    const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
    console.log(message);
}

//Print out error message
function printError(error) {
    console.log(error.message);
}

function get(query) {
    const readableQuery = query.replace('_', ' ');
    try {
        const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`,
            response => {
                if (response.statusCode === 200) {
                    let body = "";
                    response.on('data', chunk => {
                        body += chunk;
                    });
                    response.on('end', () => {
                        try {
                            //Parse data
                            const weather = JSON.parse(body);
                            //Check to see if location found
                            if (weather.location) {
                                printWeather(weather);
                            } else {
                                const queryError = new Error(`The location "${readableQuery}" was not found.`);
                                printError(queryError);
                            }
                        } catch(error) {
                            //Parse Error
                            printError(error);
                        }
                    });
                } else{
                    //Status code error
                    const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[response.statusCode]})`);
                    printError(statusCodeError);
                }
            });
    } catch(error) {
        printError(error);
    }
}

module.exports.get = get;