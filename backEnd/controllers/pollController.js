const pollService = require('../services/pollService');

const createPoll = async (req, res) => {
  const { eventName, groupId, findPotentialTimesUntil, timeRange, excludeMembers, allowMultipleVotes, createdBy } = req.body;

  try {
    const poll = await pollService.createPoll(eventName, groupId, findPotentialTimesUntil, timeRange, excludeMembers, allowMultipleVotes, createdBy);
    res.json(poll);
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).send('Error creating poll');
  }
};

const getPoll = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await pollService.getPoll(pollId);
    res.json(poll);
  } catch (error) {
    console.error('Error fetching poll:', error);
    res.status(500).send('Error fetching poll');
  }
};

const voteOnPoll = async (req, res) => {
  const { pollId } = req.params;
  const { participant, votes } = req.body;

  try {
    const poll = await pollService.voteOnPoll(pollId, participant, votes);
    res.json(poll);
  } catch (error) {
    console.error('Error voting on poll:', error);
    res.status(500).send('Error voting on poll');
  }
};

const getTotalVoters = async (req, res) => {
  const { pollId } = req.params;

  try {
    const { totalVoters, groupSize } = await pollService.getTotalVoters(pollId);

    res.json({
      totalVoters,
      groupSize,
      message: `Out of ${groupSize} group members, ${totalVoters} have voted.`
    });
  } catch (error) {
    console.error('Error fetching total voters:', error);
    res.status(500).send('Error fetching total voters');
  }
};

module.exports = {
  createPoll,
  getPoll,
  voteOnPoll,
  getTotalVoters
};
