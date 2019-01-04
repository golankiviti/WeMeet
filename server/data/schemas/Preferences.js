// define the users schema

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

const User = require('./Users');


let schema = mongoose.Schema({
    name: String,
    address: String,
    user: {type: ObjectId, ref: "User"},
});

module.exports = mongoose.model('preference', schema);