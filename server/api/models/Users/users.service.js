const mongoose = require('mongoose');

const users = require('../../../data').schemas.users;
const preferences = require('../../../data').schemas.preferences;

const getAllUsers = () => {
    return users.find({});
};

const getAllPreferences = () => {
    return preferences.find({});
};

const getPreference = (id) => {
    return preferences.findById(new mongoose.Types.ObjectId(id));
};

const addPreference = (preference) => {
    preference.user = new mongoose.Types.ObjectId(preference.user);
    let newPreference = new preferences(preference);
    // save the user
    return newPreference.save();
};

const updatePreference = (preference, prefId) => {
    preference.user = mongoose.Types.ObjectId(preference.user);
    return preferences.findOneAndUpdate({ '_id': new mongoose.Types.ObjectId(prefId) }, preference);
};

const deletePreference = (prefId) => {
    return preferences.delete({ '_id': new mongoose.Types.ObjectId(prefId) });
};

module.exports = {
    getAllUsers,
    getAllPreferences,
    getPreference,
    addPreference,
    updatePreference,
    deletePreference
};