const Poll = require('../models/poll');
const Group = require('../models/group');
const freeTimeService = require('./freeTimeService');

const createPoll = async (eventName, groupId, findPotentialTimesUntil, minimumDuration, excludeMembers, allowMultipleVotes, createdBy) => {
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      console.error(`Group not found: ${groupId}`);
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

    // Find the nearest available time slot
    const currentTime = new Date();
    let nearestTimeSlot = null;
    for (const day of choppedFreeTimeSlots) {
      for (const interval of day.intervals) {
        const start = new Date(interval.start);
        if (start > currentTime) {
          nearestTimeSlot = interval;
          break;
        }
      }
      if (nearestTimeSlot) break;
    }

    const poll = new Poll({
      eventName,
      group: groupId,
      findPotentialTimesUntil,
      minimumDuration,
      excludeMembers,
      allowMultipleVotes,
      createdBy,
      freeTimeSlots: choppedFreeTimeSlots,
      nearestTimeSlot, // Store the nearest available time slot
      votes: []
    });

    await poll.save();
    return poll;
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error;
  }
};

const getPoll = async (pollId) => {
  const poll = await Poll.findById(pollId).populate('group');
  if (!poll) {
    throw new Error('Poll not found');
  }
  return poll;
};

const voteOnPoll = async (pollId, participant, vote) => {
  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }

  const existingVote = poll.votes.find(v => v.participant === participant);
  if (existingVote) {
    existingVote.vote = vote;
  } else {
    poll.votes.push({ participant, vote });
  }

  await poll.save();
  return poll;
};

module.exports = {
  createPoll,
  getPoll,
  voteOnPoll
};