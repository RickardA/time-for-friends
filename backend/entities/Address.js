const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let addressSchema = new Schema({
    city: {type: String, required: true},
    country: {type: String, required: true},
    locationId: {type: String, required: false},
});

module.exports = db.model('Address', addressSchema);