const express = require('express');

const meetingController = require('./meeting.controller');

const router = express.Router();

router.get('/:id', meetingController.getUserMeetings);
router.put('/', meetingController.creatNewMeeting);
router.post('/', meetingController.updateMeeting);
module.exports = router;