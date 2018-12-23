require('dotenv').config();

const express = require('express'),
    Promise = require('bluebird');

const apiRouter = require('./api'),
    connectToMongo = require('./data');

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || '8989',
    MONGO_URL = process.env.MONGO_URL || 'localhost',
    MONGO_PORT = process.env.MONGO_PORT || '27017',
    MONGO_USERNAME = process.env.MONGO_USERNAME || null,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD || null;

app.use('/api', apiRouter);

app.all('/', (req, res) => {
    // not found page
    res.sendStatus(404);
});

return connectToMongo(MONGO_URL, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD)
    .then(() => {
        app.listen(parseInt(SERVER_PORT), () => {
            console.log(`server is up on port ${SERVER_PORT}`);
        });
    })
    .catch((err) => {
        console.log('could not connect to mongo');
        console.log(err);
    });