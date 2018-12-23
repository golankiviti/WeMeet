// get the process environment
require('dotenv').config();

// node js core modules
const path = require('path');

// npm modules
const express = require('express'),
    Promise = require('bluebird');

// relative paths
const apiRouter = require('./api'),
    connectToMongo = require('./data');

const app = express();

// init neccesary configuration
const SERVER_PORT = process.env.SERVER_PORT || '8989',
    MONGO_URL = process.env.MONGO_URL || 'localhost',
    MONGO_PORT = process.env.MONGO_PORT || '27017',
    MONGO_USERNAME = process.env.MONGO_USERNAME || null,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD || null;

// export /api route
app.use('/api', apiRouter);

// export production client side
app.use(express.static(path.join(__dirname, '/build')));

// connet to mongo
return connectToMongo(MONGO_URL, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD)
    .then(() => {
        // start express server
        app.listen(parseInt(SERVER_PORT), () => {
            console.log(`server is up on port ${SERVER_PORT}`);
        });
    })
    .catch((err) => {
        console.log('could not connect to mongo');
        console.log(err);
    });