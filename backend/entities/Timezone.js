const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

let timezoneSchema = new Schema({
    _id: ObjectId,
  name: String,
});

module.exports = db.model('Timezone', timezoneSchema);