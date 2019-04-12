// define the users schema

const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    moment = require('moment');

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
    gender: String,
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

schema.methods.generateJWT = function () {
    const today = moment().toDate();
    const expirationDate = moment(today);
    expirationDate = expirationDate.add(60, 'd').toDate();

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

module.exports = mongoose.model('user', schema);