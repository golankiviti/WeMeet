/**
 * authentication service
 * it responsible to init passport,
 * registration,
 * login,
 * fast check if user exist
 */

// load all the things we need
const LocalStrategy = require('passport-local').Strategy,
    jwt = require('jsonwebtoken');


// get userservice for the db access
const userModel = require('../data/schemas/Users'),
    logger = require('../utils/logger'),
    jwtService = require('./jwt.service');

let _passport;

// expose this function to our app using module.exports
module.exports = function (passport) {

    // add to our passport the jwt token policy
    jwtService(passport);

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        userModel.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            return userModel.findOne({
                    'local.email': email
                })
                .then((user) => {
                    if (user) {
                        return Promise.resolve(false);
                    }
                    // if there is no user with that email
                    // create the user
                    let {
                        address,
                        gender,
                        firstName,
                        lastName
                    } = req.body;
                    let newUser = new userModel({
                        address,
                        gender,
                        firstName,
                        lastName
                    });

                    // set the user's local credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    // save the user
                    return newUser.save();
                })
                .then((newUserOrFalse) => {

                    // in case we succeed to save the new user, delete it password before send it to client
                    if (!newUserOrFalse) {
                        delete newUserOrFalse.local.password;
                    }
                    return done(null, newUserOrFalse);
                })
                .catch((err) => {
                    return done(err);
                })
        }));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            return userModel.findOne({
                    'local.email': email
                })
                .then((user) => {
                    // if no user is found, return the message
                    if (!user)
                        return done(null, false);

                    // if the user is found but the password is wrong
                    if (!user.validPassword(password))
                        return done(null, false);

                    // delete user password to not return it to client
                    user = user.toObject();
                    delete user.local.password;
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                })
        }));

    _passport = passport;

};

module.exports.register = (req, res, next) => {
    logger.debug('register user');
    _passport.authenticate('local-signup', (err, user) => {
        if (err) {
            logger.error(err);
            return res.status(500).send(err);
        }
        // case user is already exist in db and we dont want to register it again
        if (user === false) {
            logger.warn('user already exist');
            return res.status(400).send('user already registered to WeMeet');
        }
        logger.debug('generate token for user');
        let payload = {
            id: user._id,
            email: user.local.email
        };
        jwt.sign(payload, jwtService.secret, {
                expiresIn: 60 * 60 * 24 * 30 * 6 // six month in seconds
            },
            (err, token) => {
                if (err) res.status(500)
                    .json({
                        error: "Error signing token",
                        raw: err
                    });
                res.json({
                    user: user,
                    token: `Bearer ${token}`
                });
            });
    })(req, res, next);
};

module.exports.login = (req, res, next) => {
    logger.debug('login user');
    _passport.authenticate('local-login', (err, user) => {
        if (err) {
            logger.error(err);
            return res.status(500).send(err);
        }
        // case couldn't login the user
        if (user === false) {
            logger.warn('got incorrect email or password');
            return res.status(200).send(false);
        }

        logger.debug('generate token for user');
        let payload = {
            id: user._id,
            email: user.local.email
        };
        jwt.sign(payload, jwtService.secret, {
                expiresIn: 60 * 60 * 24 * 30 * 6 // six month in seconds
            },
            (err, token) => {
                if (err) res.status(500)
                    .json({
                        error: "Error signing token",
                        raw: err
                    });
                res.json({
                    user: user,
                    token: `Bearer ${token}`
                });
            });
    })(req, res, next);
};

module.exports.logout = (req, res, next) => {
    req.logout();
    res.status(200).send(true);
};

module.exports.isUserExist = (req, res, next) => {
    logger.debug('check if email exist in db')
    return userModel.countDocuments({
            'local.email': req.body.email
        })
        .then((users) => {
            if (users > 0) {
                return res.status(200).send(true);
            }
            return res.status(200).send(false);
        })
        .catch((err) => {
            logger.error(err);
            return res.status(500).send(false);
        })
};


module.exports.isLoggedIn = (req, res, next) => {
    // check the jwt token from header before continue to the next logic
    _passport.authenticate('jwt', {
        session: true
    })(req, res, next);
}

function userResponse(mongoUser) {
    let {
        email
    } = mongoUser.local, {
        _id,
        firstName,
        lastName
    } = mongoUser;
    return {
        _id,
        email,
        firstName,
        lastName
    }
};