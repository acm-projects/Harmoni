const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/', calendarController.initiateOAuth);
router.get('/redirect', calendarController.handleOAuthCallback);
router.get('/fetch-events/:email', calendarController.fetchEvents);
router.post('/calculate-free-time/:email', calendarController.calculateFreeTime);
router.get('/calendars/:email', calendarController.getCalendars);
router.post('/calculate-free-time-multiple', calendarController.calculateFreeTimeForMultipleUsers); // New route

module.exports = router;