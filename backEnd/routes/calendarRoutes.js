const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/', calendarController.initiateOAuth);
router.get('/fetch-events/:email', calendarController.fetchEvents);
router.post('/calculate-free-time-multiple', calendarController.calculateFreeTimeMultiple);

module.exports = router;