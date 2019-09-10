const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const app = express();
const dbName = 'time-for-friends';
mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

let consoleColors = {
    red: "\u001b[1;31m",
    green: "\u001b[1;32m",
    blue: "\u001b[1;34m",
    yellow: "\u001b[1;33m",
    purple: "\u001b[1;35m",
    cyan: "\u001b[1;36m",
    white: "\u001b[1;37m",
}


global.db = mongoose.connection;
db.on('error', () => console.log(`${consoleColors.red}Could not connect to db${consoleColors.white}`));
db.once('open', () => {
    console.log(`${consoleColors.green}Connected to db: ${dbName}${consoleColors.white}`);
    startWebServer();
});

function startWebServer() {
    const port = 3000;
    app.listen(port, () => console.log(`${consoleColors.green}Listening on port: ${port}${consoleColors.white}`));
}

const Person = require('./entities/Person');

app.use(express.json());
app.use(express.static('www'));

app.post('/api/:entity', async (req, res) => {
    try {
        const Model = mongoose.model(req.params.entity);
        let instance = await Model.create(req.body).catch((err) => {
            res.json({ error: 'Something went wrong while saving' });
        });
        res.json(instance);
    } catch (err) {
        res.json(err);
    }
})

app.get('/api/:entity', async (req, res) => {
    try {
        const Model = mongoose.model(req.params.entity);
        let result = await Model.find().catch((err) => {
            res.status(401);
            res.json({ error: 'Something went wrong' });
            return
        });
        res.json(Object.values(result));
    } catch (err) {
        res.json(err);
    }
})

app.get('/api/:entity/:id', async (req, res) => {
    try {
        const Model = mongoose.model(req.params.entity);
        let result = await Model.find(ObjectId(req.params.id)).catch((err) => {
            res.status(401);
            res.json({ error: 'Does not exists' });
            return
        });
        res.json(Object.values(result));
    } catch (err) {
        res.json(err);
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