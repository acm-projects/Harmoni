const Poll = require('../models/poll');
const Group = require('../models/group');
const freeTimeService = require('./freeTimeService');

const createPoll = async (eventName, groupId, findPotentialTimesUntil, minimumDuration, excludeMembers, allowMultipleVotes, createdBy) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error('Group not found');
  }

  // Filter out excluded members
  const participants = group.members.filter(member => !excludeMembers.includes(member));

  // Calculate free times for the group
  const freeTimeSlots = await freeTimeService.calculateFreeTimeForMultipleUsers(
    participants.map(email => ({ email, ignoreCalendars: [], assignmentBuffer: 0, examBuffer: 0 })),
    Math.ceil((new Date(findPotentialTimesUntil) - new Date()) / (24 * 60 * 60 * 1000))
  );

  // Chop up the time intervals into increments of minimumDuration
  const choppedFreeTimeSlots = freeTimeSlots.map(day => {
    const choppedIntervals = [];
    day.intervals.forEach(interval => {
      let start = new Date(interval.start);
      const end = new Date(interval.end);
      while (start < end) {
        const nextStart = new Date(start.getTime() + minimumDuration * 60 * 1000);
        if (nextStart <= end) {
          choppedIntervals.push({
            start: start.toISOString(),
            end: nextStart.toISOString()
          });
        }
        start = nextStart;
      }
    });
    return {
      date: day.date,
      intervals: choppedIntervals
    };
  });

  const poll = new Poll({
    eventName,
    group: groupId,
    findPotentialTimesUntil,
    minimumDuration,
    excludeMembers,
    allowMultipleVotes,
    createdBy,
    freeTimeSlots: choppedFreeTimeSlots,
    votes: []
  });

  await poll.save();
  return poll;
};

const getPoll = async (pollId) => {
  const poll = await Poll.findById(pollId).populate('group');
  if (!poll) {
    throw new Error('Poll not found');
  }
  return poll;
};

const voteOnPoll = async (pollId, participant, votes) => {
  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }

  const existingVote = poll.votes.find(vote => vote.participant === participant);
  if (existingVote) {
    existingVote.slots = votes;
  } else {
    poll.votes.push({ participant, slots: votes });
  }

  await poll.save();
  return poll;
};

module.exports = {
  createPoll,
  getPoll,
  voteOnPoll
};