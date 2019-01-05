const mongoose = require('mongoose');

const users = require('../../../data').schemas.users;
const preferences = require('../../../data').schemas.preferences;
const restrictions = require('../../../data').schemas.restrictions;

const getAllUsers = () => {
    return users.find({});
};

/* ---------------------------------------- user's Preferences ---------------------------------------- */

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

/* ---------------------------------------- user's Restrictions ---------------------------------------- */

const getAllRestrictions = () => {
    return restrictions.find({});
};

const getRestriction = (id) => {
    return restrictions.findById(new mongoose.Types.ObjectId(id));
};

const addRestriction = (restriction) => {
    restriction.user = new mongoose.Types.ObjectId(restriction.user);
    let newRestriction = new restrictions(restriction);
    // save the user
    return newRestriction.save();
};

const updateRestriction = (restriction, resId) => {
    restriction.user = mongoose.Types.ObjectId(restriction.user);
    return restrictions.findOneAndUpdate({ '_id': new mongoose.Types.ObjectId(resId) }, restriction);
};

const deleteRestriction = (resId) => {
    return restrictions.delete({ '_id': new mongoose.Types.ObjectId(resId) });
};

module.exports = {
    getAllUsers,
    getAllPreferences,
    getPreference,
    addPreference,
    updatePreference,
    deletePreference,
    getAllRestrictions,
    getRestriction,
    addRestriction,
    updateRestriction,
    deleteRestriction
};