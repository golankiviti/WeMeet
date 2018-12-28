// define the users schema

const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

let schema = mongoose.Schema({
    local: {
        email: String,
        password: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    address: String,
    gender: Boolean,
    firstName: String,
    lastName: String
});

schema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', schema);