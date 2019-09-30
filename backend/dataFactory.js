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

async function createAdresses() {
    let Address = require('./entities/Address');
    let addressAttributes = ['cities', 'countries']
    let attributeValues = {
        cities: [],
        countries: []
    }
    try {

        console.log(`${consoleColors.yellow}Clearing addresses collection...${consoleColors.white}`);
        Address.collection.deleteMany({});
        console.log(`${consoleColors.green}Addresses collection cleared${consoleColors.white}`);

        for (attribute of addressAttributes) {

            let input = fs.createReadStream(`./data/${attribute}.txt`);

            let readLine = require('readline').createInterface({
                input: input,
                terminal: false
            });

            console.log(`${consoleColors.yellow}Loading ${attribute} from file${consoleColors.white}`);
            await new Promise((resolve) => {
                readLine.on('line', (line => {
                    resolve(line);
                    attributeValues[attribute].push(line);

                }));
            });
            console.log(`${consoleColors.green}All ${attribute} loaded!${consoleColors.white}`);
        }
            console.log(`${consoleColors.green}All addressAttributes loaded!${consoleColors.white}`);

        for(let i = 0;i < 30; i++){
            let tempAddress = new Address({
                city: attributeValues.cities[Math.floor(Math.random() * attributeValues.cities.length)],
                country: attributeValues.countries[Math.floor(Math.random() * attributeValues.countries.length)]
            })
            tempAddress.save();
        }

        console.log(`${consoleColors.green}Addresses pushed into DB!${consoleColors.white}`);

    } catch (err) {
        console.log(`${consoleColors.red}An error occured in createAddresses: ${err}${consoleColors.white}`);
    }

}

async function createFakeData() {

    let data = {
        Address: [{}],
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
                address: data['Address'][Math.floor(Math.random() * 29)]._id,
                timezone: data['Timezone'][Math.floor(Math.random() * 500)]._id
            })
            tempPerson.save();
        }
    })

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
module.exports.createAdresses = createAdresses;
module.exports.createFakeData = createFakeData;


