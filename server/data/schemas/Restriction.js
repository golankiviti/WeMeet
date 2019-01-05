// define the users schema

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

let schema = mongoose.Schema({
    name: String,
    user: { type: ObjectId, ref: "User" },
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('restriction', schema);