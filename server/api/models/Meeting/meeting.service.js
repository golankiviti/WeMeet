const meeting = require('../../../data').schemas.meetings;

const getUserMeetings = (userName) => {
    return  meeting.find({ $or: [ {"creater" : userName}, {"participants" : {$in: userName}}] });
};

const creatNewMeeting = (meeting) => {
   var newMeeting = new meeting(meeting);
    return newMeeting.save();
};


module.exports = {
    getUserMeetings,
    creatNewMeeting

};

// function userResponse(mongoMeeting) {
//     return
//     id,
//     name,
//     creater,
//     startDate,
//     endDate,
//     invited,
//     participants,
//     MeetingLocation
// };
