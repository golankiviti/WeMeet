const userService = require('./users.service');

const getAllUsers = (req, res) => {
    return userService.getAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const getAllPreferences = (req, res) => {
    return userService.getAllPreferences()
        .then((preferences) => {
            res.json(preferences);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const getPreference = (req, res) => {
    return userService.getPreference(req.params.prefId)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const addPreference = (req, res) => {
    let pref = {
        name,
        address
    } = req.body;
    pref.user = req.params.id;
    return userService.addPreference(pref)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const updatePreference = (req, res) => {
    let pref = {
        name,
        address
    } = req.body;
    pref.user = req.params.userId;
    return userService.updatePreference(pref, req.params.prefId)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const deletePreference = (req, res) => {
    return userService.deletePreference(req.body.prefId)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}


module.exports = {
    getAllUsers,
    getAllPreferences,
    getPreference,
    addPreference,
    updatePreference,
    deletePreference
}