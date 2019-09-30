const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

let personSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    address: { type: ObjectId, ref: 'Address', required: true},
    timezone: { type: ObjectId, ref: 'Timezone', required: true },
});

module.exports = db.model('Person', personSchema);