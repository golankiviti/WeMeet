const express = require('express');

const userRouter = require('./models/Users/users.router');

const router = express.Router();

router.use('/users', userRouter);

module.exports = router;