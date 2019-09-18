const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

let consoleColors = {
    red: "\u001b[1;31m",
    green: "\u001b[1;32m",
    blue: "\u001b[1;34m",
    yellow: "\u001b[1;33m",
    purple: "\u001b[1;35m",
    cyan: "\u001b[1;36m",
    white: "\u001b[1;37m",
}

const app = express();
const dbName = 'time-for-friends';
mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

global.db = mongoose.connection;
db.on('error', () => console.log(`${consoleColors.red}Could not connect to db${consoleColors.white}`));
db.once('open', () => {
    console.log(`${consoleColors.green}Connected to db: ${dbName}${consoleColors.white}`);
    startWebServer();
});

function startWebServer() {
    const port = 5000;
    app.listen(port, () => console.log(`${consoleColors.green}Listening on port: ${port}${consoleColors.white}`));

    //let dataFactory = require('./dataFactory.js');
    //dataFactory.loadTimeZones();
}

require('./entities/Person');
require('./entities/City');
require('./entities/Country');
require('./entities/Timezone');


app.use(express.json());
app.use(express.static('www'));

app.post('/api/:entity', async (req, res) => {
    try {
        const Model = mongoose.model(req.params.entity);
        let instance = await Model.create(req.body);
        res.status(201).json(instance);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(`${consoleColors.red}Error in post: ${err}${consoleColors.white}`);
    }
})

app.get('/api/:entity', async (req, res) => {
    try {
        req.query.find = req.query.find ? JSON.parse(decodeURIComponent(req.query.find)) : {};
        req.query.extras = req.query.extras ? JSON.parse(decodeURIComponent(req.query.extras)) : {};
        const Model = mongoose.model(req.params.entity);
        const result = await Model.find(req.query.find, null, req.query.extras);
        if (!result) {
            res.status(401).json({ error: 'Nothing found' });
            return;
        } else {
            res.status(200).json(Object.values(result));
        }
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(`${consoleColors.red}Error in get: ${err}${consoleColors.white}`);
    }
})

app.get('/api/:entity/:id', async (req, res) => {
    try {
        req.query.find = req.query.find ? JSON.parse(decodeURIComponent(req.query.find)) : {};
        req.query.extras = req.query.extras ? JSON.parse(decodeURIComponent(req.query.extras)) : {};
        const Model = mongoose.model(req.params.entity);
        let result = await Model.findOne(ObjectId(req.params.id), null, req.query.extras);
        if (!result) {
            res.status(401).json({ error: 'Nothing found' });
            return;
        } else {
            res.status(200).json(Object.values(result));
        }
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(`${consoleColors.red}Error in get by id: ${err}${consoleColors.white}`);
    }
})

app.put('/api/:entity/:id', async (req, res) => {
    const Model = mongoose.model(req.params.entity);
    const result = await Model.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body }).catch(err => {
        res.json({ error: err });
        return
    });
    if (!result) {
        res.status(404);
        res.json({ error: "No such person!" });
    } else {
        res.json(result);
    }
});

app.delete('/api/:entity/:id', async (req, res) => {
    const Model = mongoose.model(req.params.entity);
    const result = await Model.deleteOne({ _id: ObjectId(req.params.id) }).catch(err => {
        res.json({ error: err });
        return
    });
    if (!result) {
        res.status(404);
        res.json({ error: "No such person!" });
    } else {
        res.json(result);
    }
});