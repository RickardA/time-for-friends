const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

let citySchema = new Schema({
    _id: ObjectId,
    name: String,
});

module.exports = db.model('City', citySchema);