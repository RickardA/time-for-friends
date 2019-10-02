const fs = require('fs');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const { once } = require('events');

let consoleColors = {
    red: "\u001b[1;31m",
    green: "\u001b[1;32m",
    blue: "\u001b[1;34m",
    yellow: "\u001b[1;33m",
    purple: "\u001b[1;35m",
    cyan: "\u001b[1;36m",
    white: "\u001b[1;37m",
}

async function loadCities() {
    let loadedCities = [];
    try {
        let input = fs.createReadStream('./data/cities.txt');

        let readLine = require('readline').createInterface({
            input: input,
            terminal: false
        });

        console.log(`${consoleColors.yellow}Loading cities from file${consoleColors.white}`);
        const promises = [];
        readLine.on('line', cityName => {
            promises.push(new Promise(async (resolve) => {
                let suggestions = await getCity(cityName);
                if (suggestions) {
                    const rightSuggestion = suggestions.filter((suggestion) => {
                        return suggestion.matchLevel.toLowerCase() === 'city'
                    });
                    if (rightSuggestion && rightSuggestion[0]) {
                        let position = await getLocation(rightSuggestion[0].locationId);
                        loadedCities.push({
                            city: rightSuggestion[0].address.city,
                            country: rightSuggestion[0].address.country,
                            locationId: rightSuggestion[0].locationId,
                            lat: position ? position.Latitude : null,
                            long: position ? position.Longitude : null
                        });
                    }
                }
                resolve(cityName);
            }));

        });
        await once(readLine, 'close');
        await Promise.all(promises);
        console.log(`${consoleColors.green}${loadedCities.length} cities was loaded!${consoleColors.white}`);
        return loadedCities;
    } catch (err) {
        console.log(`${consoleColors.red}An error occured in loadCities: ${err}${consoleColors.white}`);
        return null;
    }

}

async function getCity(cityName) {
    try {
        //console.log(`${consoleColors.yellow}Getting city information for: ${cityName}${consoleColors.white}`);
        let result = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=RaCeBN6d2qKOWzRWcBZu&app_code=_BOiSdF63exs1SfJ1tqmYg&language=en&query=${cityName}`, {
            method: 'GET',
        })
        result = await result.json();
        if (result && result.suggestions) {
            //console.log(`${consoleColors.green}Got city information for: ${cityName}${consoleColors.white}`);
            return result.suggestions;
        }
    } catch (err) {
        console.log(`${consoleColors.red}Error getting city information for: ${cityName}${consoleColors.white}`);
    }
    return null;
}

async function getLocation(locationId) {
    try {
        //console.log(`${consoleColors.yellow}Getting location for locationId:${locationId}${consoleColors.white}`);
        let result = await fetch(`http://geocoder.api.here.com/6.2/geocode.json?locationid=${locationId}&app_id=RaCeBN6d2qKOWzRWcBZu&app_code=_BOiSdF63exs1SfJ1tqmYg&gen=8`, {
            method: 'GET',
        })
        result = await result.json();
        if (result) {
            //console.log(`${consoleColors.green}Got location for locationId:${locationId}${consoleColors.white}`);
            return result.Response.View[0].Result[0].Location.DisplayPosition;
        }
    }
    catch (err) {
        console.log(`${consoleColors.red}Error getting location for locationId:${locationId}${consoleColors.white}`);
    }
    return null;
}

async function createAdresses() {
    let cities = await loadCities();
    let Address = require('./entities/Address');
    if (cities) {
        try {

            console.log(`${consoleColors.yellow}Clearing addresses collection...${consoleColors.white}`);
            Address.collection.deleteMany({});
            console.log(`${consoleColors.green}Addresses collection cleared${consoleColors.white}`);

            let addressCounter = 0;
            for (city of cities) {
                addressCounter += 1;
                let tempAddress = new Address({
                    city: city.city,
                    country: city.country,
                    locationId: city.locationId,
                    long: city.long,
                    lat: city.lat
                });
                await tempAddress.save();
            }
            console.log(`${consoleColors.green}${addressCounter} addresses pushed into DB!${consoleColors.white}`);
            return true;
        } catch (err) {
            console.log(`${consoleColors.red}An error occured in createAddresses: ${err}${consoleColors.white}`);
            return false;
        }
    } else {
        console.log(`${consoleColors.red}Something went wrong in createAddresses, got no cities :( ${consoleColors.white}`);
        return false;
    }
}

async function createFakeData() {

    let addressResult = await createAdresses();
    let timezoneResult = await loadTimeZones();

    if (addressResult && timezoneResult) {
        try {

            console.log(`${consoleColors.yellow}Building persons...${consoleColors.white}`);
            let data = {
                Address: [],
                Timezone: [],
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

            readLine.on('close', async () => {
                let Person = require('./entities/Person');
                Person.collection.deleteMany({});

                for (let i = 0; i < 30; i++) {
                    let tempPerson = new Person({
                        firstName: data['persons'][Math.floor(Math.random() * data['persons'].length)].split(" ")[0],
                        lastName: data['persons'][Math.floor(Math.random() * data['persons'].length)].split(" ")[1],
                        phoneNumber: data['phonenumbers'][Math.floor(Math.random() * data['phonenumbers'].length)],
                        email: data['emails'][Math.floor(Math.random() * data['emails'].length)],
                        address: data['Address'][Math.floor(Math.random() * data['Address'].length)]._id,
                        timezone: data['Timezone'][Math.floor(Math.random() * data['Timezone'].length)]._id
                    })
                    await tempPerson.save();
                }
            })
            console.log(`${consoleColors.green}Persons created and pushed into DB!${consoleColors.white}`);
        } catch (err) {
            console.log(`${consoleColors.red}An error occured in createFakeData: ${err}${consoleColors.white}`);
        }
    } else {
        console.log(`${consoleColors.red}Something went wrong while trying to create mocdata, aborting....${consoleColors.white}`);
    }
}

async function loadTimeZones() {
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
        const promises = [];
        readLine.on('line', (line => {
            promises.push(new Promise((resolve) => {
                let tempTimezone = new Timezone({
                    offset: line
                })
                tempTimezone.save();
                resolve(line);
            }));
        }));

        await once(readLine, 'close');
        await Promise.all(promises);

        console.log(`${consoleColors.green}All timezones saved!${consoleColors.white}`);
        return true;
    } catch (err) {
        console.log(`${consoleColors.red}An error occured in loadTimeZones: ${err}${consoleColors.white}`);
        return false;
    }
}

module.exports.createFakeData = createFakeData;



