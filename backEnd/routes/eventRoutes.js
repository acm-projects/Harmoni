const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/stored-events/:email', eventController.fetchStoredEvents);

module.exports = router;