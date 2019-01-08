// define the meetings schema

const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

let schema = mongoose.Schema({
        id: String,
		name: String,
		creater: String,
		fromDate: Date,
		toDate: Date,
		invited: [String],
		participants: [String],
		locations: [String],
		selectedLocation: String
});


module.exports = mongoose.model('Meeting', schema);