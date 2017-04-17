const weather = require('./weather.js');

//Join multipe values passed as args and replace all spaces with underscores
const query = process.argv.slice(2).join("_").replace(' ', '_');
//query ex: 90210
//query ex: Cleveland_OH
//query ex: London_England
weather.get(query);