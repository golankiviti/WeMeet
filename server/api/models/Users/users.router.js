const express = require('express');

const usersController = require('./users.controller');

const router = express.Router();

router.get('/', usersController.getAllUsers);

/* user's Prefernces: */
router.get('/:id/preferences', usersController.getAllPreferences);
router.get('/:userId/preferences/:prefId', usersController.getPreference);
router.put('/:id/preference', usersController.addPreference);
router.put('/:userId/preference/:prefId', usersController.updatePreference);
router.delete('/preference', usersController.deletePreference);

module.exports = router;