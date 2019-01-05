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

/* user's Restrictions: */
router.get('/:id/restrictions', usersController.getAllRestrictions);
router.get('/:userId/restrictions/:resId', usersController.getRestriction);
router.put('/:id/restriction', usersController.addRestriction);
router.put('/:userId/restriction/:resId', usersController.updateRestriction);
router.delete('/restriction', usersController.deleteRestriction);

module.exports = router;