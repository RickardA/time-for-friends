const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

let citySchema = new Schema({
    name: {type: String, required: true},
});

module.exports = db.model('City', citySchema);