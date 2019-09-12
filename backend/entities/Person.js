const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

let personSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    mail: {type: String, required: true},
    city: { type: ObjectId, ref: 'City', required: true},
    country: { type: ObjectId, ref: 'Country', required: true },
    timezone: { type: ObjectId, ref: 'Timezone', required: true },
});

module.exports = db.model('Person', personSchema);