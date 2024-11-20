const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.post('/create', pollController.createPoll); // Endpoint to create a poll
router.get('/:pollId', pollController.getPoll); // Endpoint to get a specific poll by ID
router.post('/:pollId/vote', pollController.voteOnPoll); // Endpoint to vote on a specific poll by ID
router.get('/:pollId/total-voters', pollController.getTotalVoters); // Endpoint to get the total number of voters for a specific poll by ID

module.exports = router;


/*
POST REQUEST TO CREATE A POLL:

POST: http://localhost:8000/api/poll/create

Request Body:
{
  "eventName": "Practice with ABIS",
  "groupId": "673d81466916ed39f7d5bc7f",
  "findPotentialTimesUntil": "2024-11-25T23:59:59.999Z",
  "timeRange": 120,
  "excludeMembers": [],
  "allowMultipleVotes": true,
  "createdBy": "matbbiji@gmail.com"
}

*/

/*
POST REQUEST TO VOTE ON A POLL:

POST: http://localhost:8000/api/poll/<pollID>/vote

Request Body:

{
  "participant": "matbbiji@gmail.com",
  "votes": [
    {
        "start": "2024-11-20T16:00:00.000Z",       //this allows you to put multiple votes for a single user bc it is a voting array
        "end": "2024-11-20T18:00:00.000Z"
    },
    {
        "start": "2024-11-21T04:30:00.000Z",
        "end": "2024-11-21T06:30:00.000Z"
    }
  ]
}

*/