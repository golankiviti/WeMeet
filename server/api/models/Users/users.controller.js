const userService = require('./users.service');

const logger = require('../../../utils/logger');

const getAllUsers = (req, res) => {
    logger.debug('get all users from db');
    return userService.getAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

/* ------------------------------ user's Preferences ------------------------------ */

const getAllPreferences = (req, res) => {
    logger.debug(`get all user with id: ${req.params.id} preference`);
    return userService.getAllPreferences(req.params.id)
        .then((preferences) => {
            res.json(preferences);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

const getPreference = (req, res) => {
    logger.debug(`get preference with id: ${req.params.prefId} from db`);
    return userService.getPreference(req.params.prefId)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

const addPreference = (req, res) => {
    let pref = {
        name,
        address
    } = req.body;
    pref.user = req.params.id;
    logger.debug(`add preference to user with id: ${pref.user} to db`);
    return userService.addPreference(pref)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

const updatePreference = (req, res) => {
    let pref = {
        name,
        address
    } = req.body;
    pref.user = req.params.userId;
    logger.debug(`update preference to user with id: ${pref.user}`);
    return userService.updatePreference(pref, req.params.prefId)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

const deletePreference = (req, res) => {
    logger.debug(`delete preference with id: ${req.body.prefId}`)
    return userService.deletePreference(req.body.prefId)
        .then((preference) => {
            res.json(preference);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

/* ------------------------------ user's Restrictions ------------------------------ */

const getAllRestrictions = (req, res) => {
    logger.debug(`get all user with id: ${req.params.id} from db`);
    return userService.getAllRestrictions(req.params.id)
        .then((restrictions) => {
            res.json(restrictions);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

const getRestriction = (req, res) => {
    logger.debug(`get restriction with id: ${req.params.resId} from db`);
    return userService.getRestriction(req.params.resId)
        .then((restriction) => {
            res.json(restriction);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

const addRestriction = (req, res) => {
    let restriction = {
        name,
        startDate,
        endDate
    } = req.body;
    restriction.user = req.params.id;
    logger.debug(`add new restriction to user with id: ${restriction.user}`);
    return userService.addRestriction(restriction)
        .then((restriction) => {
            res.json(restriction);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

const updateRestriction = (req, res) => {
    let restriction = {
        name,
        startDate,
        endDate
    } = req.body;
    restriction.user = req.params.userId;
    logger.debug(`update restriction to user with id: ${restriction.user}`);
    return userService.updateRestriction(restriction, req.params.resId)
        .then((restriction) => {
            res.json(restriction);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
}

const deleteRestriction = (req, res) => {
    logger.debug(`delete restriction with id: ${req.body.resId} from db`);
    return userService.deleteRestriction(req.body.resId)
        .then((restriction) => {
            res.json(restriction);
        })
        .catch((err) => {
            logger.error(err);
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