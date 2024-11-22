const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.post('/create', pollController.createPoll); // Endpoint to create a poll
router.get('/:pollId', pollController.getPoll); // Endpoint to get a specific poll by ID
router.post('/:pollId/vote', pollController.voteOnPoll); // Endpoint to vote on a specific poll by ID
router.get('/:pollId/total-voters', pollController.getTotalVoters); // Endpoint to get the total number of voters for a specific poll by ID
router.get('/:pollId/voting-percentages', pollController.getVotingPercentage);  // Endpoint to calculate the percentage of voting for each time slot

module.exports = router;