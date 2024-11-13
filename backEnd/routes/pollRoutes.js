const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.post('/create', pollController.createPoll);
router.get('/:pollId', pollController.getPoll);
router.post('/:pollId/vote', pollController.voteOnPoll);

module.exports = router;