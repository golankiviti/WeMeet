// define the meetings schema

const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

let schema = mongoose.Schema({
        id: String,
		name: String,
		creater: String,
		startDate: Date,
		endDate: Date,
		invited: [String],
		participants: [String],
		MeetingLocation: String
});


module.exports = mongoose.model('meetings', schema);