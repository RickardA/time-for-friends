const fs = require('fs');

let consoleColors = {
    red: "\u001b[1;31m",
    green: "\u001b[1;32m",
    blue: "\u001b[1;34m",
    yellow: "\u001b[1;33m",
    purple: "\u001b[1;35m",
    cyan: "\u001b[1;36m",
    white: "\u001b[1;37m",
}

function loadCountries() {
    let Country = require('./entities/Country');
    try {

        console.log(`${consoleColors.yellow}Clearing country collection...${consoleColors.white}`);
        Country.collection.deleteMany({});
        console.log(`${consoleColors.green}Country collection cleared${consoleColors.white}`);

        let input = fs.createReadStream('./data/countries.txt');

        let readLine = require('readline').createInterface({
            input: input,
            terminal: false
        });

        console.log(`${consoleColors.yellow}Loading countries from file${consoleColors.white}`);
        readLine.on('line', (line => {
            let countryName = line.replace(/.*\|/, "");
            let tempCountry = new Country({
                name: countryName
            })
            tempCountry.save();
        }));
        console.log(`${consoleColors.green}All countries saved!${consoleColors.white}`);
    } catch (err) {
        console.log(`${consoleColors.red}An error occured in loadCountries: ${err}${consoleColors.white}`);
    }
    
}

function loadTimeZones() {
    let Timezone = require('./entities/Timezone');
    try {

        console.log(`${consoleColors.yellow}Clearing Timezone collection...${consoleColors.white}`);
        Timezone.collection.deleteMany({});
        console.log(`${consoleColors.green}Timezone collection cleared${consoleColors.white}`);

        let input = fs.createReadStream('./data/timezones.txt');

        let readLine = require('readline').createInterface({
            input: input,
            terminal: false
        });

        console.log(`${consoleColors.yellow}Loading timezones from file${consoleColors.white}`);
        readLine.on('line', (line => {
            let tempTimezone = new Timezone({
                offset: line
            })
            tempTimezone.save();
        }));
        console.log(`${consoleColors.green}All timezones saved!${consoleColors.white}`);
    } catch (err) {
        console.log(`${consoleColors.red}An error occured in loadTimeZones: ${err}${consoleColors.white}`);
    }
    
}

module.exports.loadCountries = loadCountries;
module.exports.loadTimeZones = loadTimeZones;


