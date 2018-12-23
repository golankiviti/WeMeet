require('dotenv');

const express = require('express'),
    Promise = require('bluebird');

const apiRouter = require('./api');

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || '8989';

app.use('/api', apiRouter);

app.all('/', (req, res) => {
    // not found page
    res.send(404);
});

app.listen(parseInt(ERVER_PORT), () => {
    console.log('server is up');
});