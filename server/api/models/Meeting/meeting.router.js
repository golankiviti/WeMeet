const express = require('express');

const meetingController = require('./meeting.controller');

const router = express.Router();

router.get('/:id', meetingController.getUserMeetings);
router.put('/', meetingController.creatNewMeeting);
router.post('/', meetingController.updateMeeting);

/**
 * users waiting meetings
 */

// get all user waitingMeetings
// :id should be userId and not meetingId
router.get('/waitingMeetings/:id', meetingController.getUserWaitingMeetings);
// get all user meeting that include him before the algorithm
// :id should be userId and not meetingId
router.get('/futureMeetings/:id', meetingController.getUserFutureMeetings);
// accept of reject meeting by user
router.post('/meetingResponse', meetingController.acceptOrRejectMeeting);

module.exports = router;