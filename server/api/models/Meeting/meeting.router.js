const express = require('express');

const meetingController = require('./meeting.controller');

const router = express.Router();

router.get('/', meetingController.getUserMeetings);
router.post('/', meetingController.creatNewMeeting);
router.post('/update', meetingController.updateMeeting);
module.exports = router;