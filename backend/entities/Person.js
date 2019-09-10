const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

let personSchema = new Schema({
    _id: ObjectId,
    firstName: String,
    lastName: String,
    age: Number,
    mail: String,
    city: { type: ObjectId, ref: 'City' },
    country: { type: ObjectId, ref: 'Country' },
    timezone: { type: ObjectId, ref: 'Timezone' },
});

module.exports = db.model('Person', personSchema);