const Poll = require('../models/poll');
const Group = require('../models/group');
const freeTimeService = require('./freeTimeService');
const { google } = require('googleapis');
const LoginInfo = require('../models/loginInfo');
const authService = require('./authService');

const createPoll = async (eventName, groupId, findPotentialTimesUntil, timeRange, excludeMembers, allowMultipleVotes, createdBy) => {
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      console.error(`Group not found: ${groupId}`);
      throw new Error('Group not found');
    }

    const participants = group.memberNames.filter(member => !excludeMembers.includes(member));
    const freeTimeSlots = await freeTimeService.calculateFreeTimeForMultipleUsers(
      participants.map(email => ({ email, ignoreCalendars: [], assignmentBuffer: 0, examBuffer: 0 })),
      Math.ceil((new Date(findPotentialTimesUntil) - new Date()) / (24 * 60 * 60 * 1000))
    );

    console.log("Participants for free time calculation:", participants);
    console.log("Calculated free time slots:", JSON.stringify(freeTimeSlots, null, 2));

    const choppedFreeTimeSlots = freeTimeSlots.map(day => {
      const choppedIntervals = [];
      day.intervals.forEach(interval => {
        let start = new Date(interval.start);
        const end = new Date(interval.end);
        while (start < end) {
          const nextStart = new Date(start.getTime() + timeRange * 60 * 1000);
          if (nextStart <= end) {
            choppedIntervals.push({ start: start.toISOString(), end: nextStart.toISOString() });
          }
          start = nextStart;
        }
      });
      return { date: day.date, intervals: choppedIntervals };
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
    if (!poll) throw new Error('Poll not found');
    return poll;
  } catch (error) {
    console.error('Error fetching poll:', error);
    throw error;
  }
};

const voteOnPoll = async (pollId, participant, votes) => {
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error('Poll not found');

    votes.forEach(selectedTimeSlot => {
      const participantVote = poll.votes.find(v => v.participant === participant);
      if (participantVote) {
        const slotExists = participantVote.slots.find(slot =>
          slot.start === selectedTimeSlot.start && slot.end === selectedTimeSlot.end
        );
        if (!slotExists) {
          participantVote.slots.push(selectedTimeSlot);
        }
      } else {
        poll.votes.push({ participant, slots: [selectedTimeSlot] });
      }
    });

    await poll.save();
    return poll;
  } catch (error) {
    console.error('Error voting on poll:', error);
    throw error;
  }
};

const getTotalVoters = async (pollId) => {
  try {
    const poll = await Poll.findById(pollId).populate('group');
    if (!poll) throw new Error('Poll not found');

    const totalVoters = new Set(poll.votes.map(vote => vote.participant)).size;
    return { totalVoters, groupSize: poll.group.memberNames.length };
  } catch (error) {
    console.error('Error fetching total voters:', error);
    throw error;
  }
};

const getVotingPercentage = async (pollId) => {
  try {
    const poll = await Poll.findById(pollId).populate('group');
    if (!poll) throw new Error('Poll not found');

    const groupSize = poll.group.memberNames.length;
    const timeSlotVotes = {};

    poll.votes.forEach(vote => {
      vote.slots.forEach(slot => {
        const slotKey = JSON.stringify({ start: slot.start, end: slot.end });
        if (!timeSlotVotes[slotKey]) timeSlotVotes[slotKey] = 0;
        timeSlotVotes[slotKey] += 1;
      });
    });

    return Object.entries(timeSlotVotes).map(([slotKey, voteCount]) => {
      const { start, end } = JSON.parse(slotKey);
      return { start, end, voteCount, percentage: ((voteCount / groupSize) * 100).toFixed(2) };
    });
  } catch (error) {
    console.error('Error fetching voting percentages:', error);
    throw error;
  }
};

const pushEventToGoogleCalendar = async (user, event) => {
  try {
    await authService.checkAndRefreshToken(user);

    const calendar = google.calendar({ version: 'v3', auth: authService.oauth2Client });
    const calendarEvent = await calendar.events.insert({ calendarId: 'primary', resource: event });

    user.calendars[0].events.push({
      summary: event.summary,
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      description: event.description,
    });

    await user.save();
  } catch (error) {
    console.error(`Error pushing event for ${user.email}:`, error);
  }
};

const pushPopularVoteToCalendars = async (pollId) => {
  try {
    const poll = await Poll.findById(pollId).populate('group');
    if (!poll) throw new Error('Poll not found');

    const { group } = poll;
    const totalVoters = new Set(poll.votes.map(vote => vote.participant)).size;
    if (totalVoters < group.memberNames.length) return;

    const timeSlotPercentages = await getVotingPercentage(pollId);
    const now = new Date();

    const popularSlot = timeSlotPercentages
      .filter(slot => new Date(slot.start) > now)
      .sort((a, b) => {
        const timeDiffA = new Date(a.start) - now;
        const timeDiffB = new Date(b.start) - now;
        return timeDiffA - timeDiffB || b.percentage - a.percentage;
      })[0];

    if (!popularSlot) return;

    const event = {
      summary: poll.eventName,
      description: `Group: ${group.groupName}\nPoll conducted for all members.`,
      start: { dateTime: popularSlot.start },
      end: { dateTime: popularSlot.end },
    };

    const users = await LoginInfo.find({ email: { $in: group.memberNames } });
    for (const user of users) {
      await pushEventToGoogleCalendar(user, event);
    }
  } catch (error) {
    console.error('Error pushing popular vote:', error);
  }
};

module.exports = {
  createPoll,
  getPoll,
  voteOnPoll,
  getTotalVoters,
  getVotingPercentage,
  pushPopularVoteToCalendars
};
