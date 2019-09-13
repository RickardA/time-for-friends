const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

let timezoneSchema = new Schema({
  offset: {type: String, required: true},
});

module.exports = db.model('Timezone', timezoneSchema);