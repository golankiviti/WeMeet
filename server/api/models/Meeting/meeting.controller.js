const meetingsService = require('./meeting.service');

const getUserMeetings = (req, res) => {
    return meetingsService.getUserMeetings(req.query.userId)
        .then((meetings) => {
            res.json(meetings);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}
const creatNewMeeting = (req, res) => {
    return meetingsService.creatNewMeeting(req.params)
        .then((meeting) => {
            res.json(meeting);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}
const updateMeeting = (req, res) => {
    return meetingsService.updateMeeting(req.params)
        .then((meeting) => {
            res.json(meeting);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}


module.exports = {
    getUserMeetings,
    creatNewMeeting,
    updateMeeting
}