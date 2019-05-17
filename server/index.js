// get the process environment
require('dotenv').config();

// node js core modules
const path = require('path');

// npm modules
const express = require('express'),
    Promise = require('bluebird'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    morgan = require('morgan'),
    cors = require('cors'),
    _ = require('lodash');

// relative paths
const apiRouter = require('./api'),
    connectToMongo = require('./data'),
    authenticationService = require('./services/authentication.service'),
    logger = require('./utils/logger');

const algorithmUtils = require('./services/alrorithm');

const app = express();

// init neccesary configuration
const SERVER_PORT = process.env.SERVER_PORT || '8989',
    MONGO_URL = process.env.MONGO_URL || 'localhost',
    MONGO_PORT = process.env.MONGO_PORT || '27017',
    MONGO_USERNAME = process.env.MONGO_USERNAME || null,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD || null;

// app.use(morgan('dev'));

// init passport with strategies
authenticationService(passport);

app.use(cookieParser());

// middleware to get body in POST requests
app.use(bodyParser.json());

// passport middlewares
app.use(session({
    secret: 'WeMeet'
}));
app.use(passport.initialize());
app.use(passport.session());

// allow cors for development
app.use(cors());

// this middleware is for logging every request the server get
app.use((req, res, next) => {
    let reqInfo = {};
    // case we have body log it
    if (!_.isEmpty(req.body)) reqInfo.body = req.body;
    // case we have params log it
    if (!_.isEmpty(req.params)) reqInfo.params = req.params;
    // case we have query log it
    if (!_.isEmpty(req.query)) reqInfo.query = req.query;


    (!_.isEmpty(reqInfo)) ?
    logger.info(reqInfo, `${req.method} ${req.originalUrl}`):
        logger.info(`${req.method} ${req.originalUrl}`);

    next();
});

app.post('/register', authenticationService.register);

app.post('/login', authenticationService.login);

app.post('/logout', authenticationService.logout);

app.post('/checkUser', authenticationService.isUserExist);

app.get('/algorithmTest', (req, res, next) => {
    algorithmUtils.geneticAlgorithmTest()
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

app.get('/algorithmForce', (req, res, next) => {
    algorithmUtils.forceRunGeneticAlgorithm()
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

app.get('/algorithmData', (req, res, next) => {
    algorithmUtils.geneticAlgorithmData()
        .then(results => {
            res.json(results);
        })
});

app.use(express.static(path.join(__dirname, '/node_modules')));

app.get('/algorithmTester', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/static/algorithmTester.html'));
});


// export /api route
app.use('/api', authenticationService.isLoggedIn, apiRouter);

// export production client side
app.use(express.static(path.join(__dirname, '/build')));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});


logger.debug('connect to mongo');
// connet to mongo
return connectToMongo(MONGO_URL, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD)
    .then(() => {
        logger.debug('connected to mongo');
        logger.debug('start express server');
        // start express server
        app.listen(parseInt(SERVER_PORT), () => {
            logger.info(`server is up on port ${SERVER_PORT}`);
            // init cron job for genetic algorithm
            algorithmUtils.initCronJob();
        });
    })
    .catch((err) => {
        logger.warn('could not connect to mongo');
        logger.error(err);
        process.exit(1);
    });