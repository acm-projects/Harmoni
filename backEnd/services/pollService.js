const Poll = require('../models/poll');
const Group = require('../models/group'); // Import explicitly
const freeTimeService = require('./freeTimeService');

const createPoll = async (eventName, groupId, findPotentialTimesUntil, timeRange, excludeMembers, allowMultipleVotes, createdBy) => {
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      console.error(`Group not found: ${groupId}`);
      throw new Error('Group not found');
    }

    // Filter out excluded members
    const participants = group.memberNames.filter(member => !excludeMembers.includes(member));

    // Calculate free times for the group
    const freeTimeSlots = await freeTimeService.calculateFreeTimeForMultipleUsers(
      participants.map(email => ({ email, ignoreCalendars: [], assignmentBuffer: 0, examBuffer: 0 })),
      Math.ceil((new Date(findPotentialTimesUntil) - new Date()) / (24 * 60 * 60 * 1000))
    );

    // Chop up the time intervals into increments of timeRange
    const choppedFreeTimeSlots = freeTimeSlots.map(day => {
      const choppedIntervals = [];
      day.intervals.forEach(interval => {
        let start = new Date(interval.start);
        const end = new Date(interval.end);
        while (start < end) {
          const nextStart = new Date(start.getTime() + timeRange * 60 * 1000);
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
      timeRange,
      excludeMembers,
      allowMultipleVotes,
      createdBy,
      freeTimeSlots: choppedFreeTimeSlots,
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
  try {
    const poll = await Poll.findById(pollId).populate('group');
    if (!poll) {
      throw new Error('Poll not found');
    }
    return poll;
  } catch (error) {
    console.error('Error fetching poll:', error);
    throw error;
  }
};

const voteOnPoll = async (pollId, participant, votes) => {
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }

    // Debugging logs
    console.log('Poll votes before processing:', JSON.stringify(poll.votes, null, 2));
    console.log('Incoming votes:', JSON.stringify(votes, null, 2));

    votes.forEach(selectedTimeSlot => {
      try {
        if (!selectedTimeSlot.start || !selectedTimeSlot.end) {
          throw new Error('Invalid time slot');
        }

        // Check if participant already has a vote entry
        let participantVote = poll.votes.find(v => v.participant === participant);

        if (participantVote) {
          // Add the time slot to the participant's slots array if not already present
          const slotExists = participantVote.slots.find(slot =>
            slot.start === selectedTimeSlot.start && slot.end === selectedTimeSlot.end
          );

          if (!slotExists) {
            participantVote.slots.push(selectedTimeSlot);
          }
        } else {
          // Create a new vote entry for the participant
          poll.votes.push({ participant, slots: [selectedTimeSlot] });
        }
      } catch (error) {
        console.error('Error processing vote:', error.message, selectedTimeSlot);
        throw error;
      }
    });

    await poll.save();

    console.log('Poll votes after processing:', JSON.stringify(poll.votes, null, 2));

    return poll;
  } catch (error) {
    console.error('Error voting on poll:', error);
    throw error;
  }
};

const getTotalVoters = async (pollId) => {
  try {
    const poll = await Poll.findById(pollId).populate('group');
    if (!poll) {
      throw new Error('Poll not found');
    }

    // Get unique participants who have voted
    const totalVoters = new Set(poll.votes.map(vote => vote.participant)).size;

    return {
      totalVoters,
      groupSize: poll.group.memberNames.length
    };
  } catch (error) {
    console.error('Error fetching total voters:', error);
    throw error;
  }
};

const getVotingPercentage = async (pollId) => {
  try {
    const poll = await Poll.findById(pollId).populate('group');
    if (!poll) {
      throw new Error('Poll not found');
    }

    const groupSize = poll.group.memberNames.length;
    const timeSlotVotes = {};

    // Loop through all votes
    poll.votes.forEach(vote => {
      vote.slots.forEach(slot => {
        const slotKey = JSON.stringify({ start: slot.start, end: slot.end }); // Use JSON string for structured keys
        if (!timeSlotVotes[slotKey]) {
          timeSlotVotes[slotKey] = 0;
        }
        timeSlotVotes[slotKey] += 1;
      });
    });

    // Calculate percentage for each time slot
    const timeSlotPercentages = Object.entries(timeSlotVotes).map(([slotKey, voteCount]) => {
      const { start, end } = JSON.parse(slotKey); // Parse JSON string back to object
      return {
        start,
        end,
        voteCount,
        percentage: ((voteCount / groupSize) * 100).toFixed(2) // Round to 2 decimal places
      };
    });

    return timeSlotPercentages;
  } catch (error) {
    console.error('Error fetching voting percentages:', error);
    throw error;
  }
};




module.exports = {
  createPoll,
  getPoll,
  voteOnPoll,
  getTotalVoters,
  getVotingPercentage
};
