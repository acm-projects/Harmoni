const express = require('express');
const router = express.Router();
const userPreferencesController = require('../controllers/userPreferencesController');

router.post('/set-ignore-calendars', userPreferencesController.setIgnoreCalendars);
router.post('/set-assignment-buffer', userPreferencesController.setAssignmentBuffer);
router.post('/set-exam-buffer', userPreferencesController.setExamBuffer);
router.get('/preferences/:email', userPreferencesController.getUserPreferences);

module.exports = router;