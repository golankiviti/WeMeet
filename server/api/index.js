const express = require('express');

const userRouter = require('./models/Users/users.router');
const meetingRouter = require('./models/Meeting/meeting.router');

const router = express.Router();

// here all sub routes will be
// sub route define CRUD for models in the db
router.use('/users', userRouter);
router.use('/meeting', meetingRouter);
module.exports = router;