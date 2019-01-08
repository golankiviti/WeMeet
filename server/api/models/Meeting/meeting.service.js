const mongoose = require('mongoose');

const meeting = require('../../../data').schemas.meetings;

const getUserMeetings = (userId) => {
    return  meeting.find({ $or: [ {"creator" : userId}, {"participants" : {$in:  userId}}] });
};

const creatNewMeeting = (currentMeeting) => {

   let newMeeting = new meeting(currentMeeting);
    return newMeeting.save();
};
const updateMeeting = (currentMeeting) => {
    return meeting.findOneAndUpdate({ '_id': new mongoose.Types.ObjectId(currentMeeting._id) }, currentMeeting);
 };

module.exports = {
    getUserMeetings,
    creatNewMeeting,
    updateMeeting

};
