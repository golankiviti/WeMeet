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

/* ------------------------------ user's Preferences ------------------------------ */

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

/* ------------------------------ user's Restrictions ------------------------------ */

const getAllRestrictions = (req, res) => {
    return userService.getAllRestrictions()
        .then((preferences) => {
            res.json(preferences);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const getRestriction = (req, res) => {
    return userService.getRestriction(req.params.resId)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const addRestriction = (req, res) => {
    let res = {
        name,
        startDate,
        endDate
    } = req.body;
    res.user = req.params.id;
    return userService.addRestriction(pref)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const updateRestriction = (req, res) => {
    let res = {
        name,
        startDate,
        endDate
    } = req.body;
    res.user = req.params.userId;
    return userService.updateRestriction(pref, req.params.resId)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const deleteRestriction = (req, res) => {
    return userService.deleteRestriction(req.body.resId)
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
    deletePreference,
    getAllRestrictions,
    getRestriction,
    addRestriction,
    updateRestriction,
    deleteRestriction
}