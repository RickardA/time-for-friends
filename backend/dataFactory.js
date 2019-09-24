const fs = require('fs');
const mongoose = require('mongoose');

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
            let countryName = line;
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

function loadCities() {
    let City = require('./entities/City');
    try {

        console.log(`${consoleColors.yellow}Clearing city collection...${consoleColors.white}`);
        City.collection.deleteMany({});
        console.log(`${consoleColors.green}City collection cleared${consoleColors.white}`);

        let input = fs.createReadStream('./data/towns.txt');

        let readLine = require('readline').createInterface({
            input: input,
            terminal: false
        });

        console.log(`${consoleColors.yellow}Loading cities from file${consoleColors.white}`);
        readLine.on('line', (line => {
            let cityName = line;
            let tempCity = new City({
                name: cityName
            })
            tempCity.save();
        }));
        console.log(`${consoleColors.green}All cities saved!${consoleColors.white}`);
    } catch (err) {
        console.log(`${consoleColors.red}An error occured in loadCities: ${err}${consoleColors.white}`);
    }

}

async function createFakeData() {

    let data = {
        City: [{}],
        Country: [{}],
        Timezone: [{}],
        emails: [],
        phonenumbers: [],
        persons: []
    }

    let readline;


    for (let i = 0; i < Object.keys(data).length; i++) {
        let key = Object.keys(data)[i];
        if (!['emails', 'phonenumbers', 'persons'].includes(key)) {
            const Model = mongoose.model(key);
            data[key] = await Model.find({}, null, {});
        } else if (['emails', 'phonenumbers', 'persons'].includes(key)) {
            let input = fs.createReadStream(`./data/${key}.txt`);

            readLine = require('readline').createInterface({
                input: input,
                terminal: false
            });

            readLine.on('line', (line => {
                data[key].push(line);
            }));


        }
    };

    readLine.on('close', () => {
        let Person = require('./entities/Person');
        Person.collection.deleteMany({});

        for (let i = 0; i < 30; i++) {
            let tempPerson = new Person({
                firstName: data['persons'][Math.floor(Math.random() * 29)].split(" ")[0],
                lastName: data['persons'][Math.floor(Math.random() * 29)].split(" ")[1],
                phoneNumber: data['phonenumbers'][Math.floor(Math.random() * 29)],
                email: data['emails'][Math.floor(Math.random() * 29)],
                city: data['City'][Math.floor(Math.random() * 29)]._id,
                country: data['Country'][Math.floor(Math.random() * 29)]._id,
                timezone: data['Timezone'][Math.floor(Math.random() * 500)]._id
            })
            tempPerson.save();
        }
    })









    /* const Model = mongoose.model('City');
    const result = await Model.find({}, null, {});
    console.log(result); */

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
module.exports.loadCities = loadCities;
module.exports.createFakeData = createFakeData;


