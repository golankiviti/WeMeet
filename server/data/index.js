const util = require('util');

const mongoose = require('mongoose'),
    _ = require('lodash');

// here we require all our schemas for the schemas dir
const users = require('./schemas/Users');

const connect = (url = 'localhost', port = '27017', username = null, password = null) => {
    let urlConnection = 'mongodb://%s:%s/WeMeet',
        connectOptions = {};
    if (!_.isNil(username)) {
        connectOptions = {
            user: username,
            pass: password
        };
    }
    connectOptions.useNewUrlParser = true;
    return mongoose.connect(util.format(urlConnection, url, port), connectOptions);
};

// export default connect function
module.exports = connect;

// export schemas to everyone
module.exports.schemas = {
    users
};