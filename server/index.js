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
    morgan = require('morgan');

// relative paths
const apiRouter = require('./api'),
    connectToMongo = require('./data'),
    authenticationService = require('./services/authentication.service');

const app = express();

// init neccesary configuration
const SERVER_PORT = process.env.SERVER_PORT || '8989',
    MONGO_URL = process.env.MONGO_URL || 'localhost',
    MONGO_PORT = process.env.MONGO_PORT || '27017',
    MONGO_USERNAME = process.env.MONGO_USERNAME || null,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD || null;

// init passport with strategies
authenticationService(passport);

app.use(morgan('dev'));

app.use(cookieParser());

// middleware to get body in POST requests
app.use(bodyParser());

// passport middlewares
app.use(session({
    secret: 'WeMeet'
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', authenticationService.register);

app.post('/login', authenticationService.login);

app.get('/checkUser', authenticationService.isUserExist);


// export /api route
app.use('/api', isLoggedIn, apiRouter);

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
        process.exit(1);
    });

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.status(401).send();
}