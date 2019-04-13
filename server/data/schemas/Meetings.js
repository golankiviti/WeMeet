// define the meetings schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

let schema = mongoose.Schema({
	id: String,
	name: String,
	creator: {
		type: ObjectId,
		ref: "User"
	},
	// flag if the algorithm find date to the meeting
	isDetermined: Boolean,
	// the desired date for the meeting (the deadline)
	desiredDate: Date,
	fromDate: Date,
	toDate: Date,
	invited: [String],
	participants: [{
		type: ObjectId,
		ref: "User"
	}],
	locations: [String],
	selectedLocation: String,
	accepted: [{
		type: ObjectId,
		ref: "User"
	}],
	rejected: [{
		type: ObjectId,
		ref: "User"
	}]
});


module.exports = mongoose.model('Meeting', schema);