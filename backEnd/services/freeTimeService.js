const { google } = require('googleapis');
const LoginInfo = require('../models/loginInfo');
const { oauth2Client, checkAndRefreshToken } = require('./authService');
const userPreferencesService = require('./userPreferencesService'); // Import user preferences service

const calculateFreeTime = async (email, days) => {
  try {
    console.log(`Calculating free time for email: ${email} over ${days} days`);

    // Fetch user info
    const user = await LoginInfo.findOne({ email });
    if (!user) {
      throw new Error(`User not found: ${email}`);
    }
    console.log(`Found user: ${user.email}`);

    // Refresh token if necessary
    await checkAndRefreshToken(user);

    // Fetch user preferences
    const preferences = await userPreferencesService.getUserPreferences(email);
    const { ignoreCalendars, assignmentBuffer, examBuffer } = preferences;

    console.log(`User preferences for ${email}:`, preferences);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    let allEvents = [];

    // Fetch events from all non-ignored calendars
    for (const calendarListEntry of user.calendars) {
      if (ignoreCalendars.includes(calendarListEntry.calendarId)) {
        console.log(`Skipping ignored calendar: ${calendarListEntry.calendarId}`);
        continue;
      }

      console.log(`Fetching events for calendar: ${calendarListEntry.calendarId}`);
      const events = await calendar.events.list({
        calendarId: calendarListEntry.calendarId,
        timeMin: new Date().toISOString(),
        timeMax: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
        maxResults: 2500,
        singleEvents: true,
        orderBy: 'startTime'
      });

      allEvents = allEvents.concat(events.data.items);
    }

    console.log(`Total events fetched for ${email}: ${allEvents.length}`);

    // Sort events by start time
    allEvents.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));

    // Calculate free time
    let freeTime = [];
    let currentTime = new Date();
    currentTime.setHours(0, 0, 0, 0); // Start at the beginning of the day

    const assignmentKeywords = ["assignment", "homework", "worksheet"];
    const examKeywords = ["test", "midterm", "final", "exam"];

    allEvents.forEach(event => {
      const eventStart = new Date(event.start.dateTime || event.start.date); // Use UTC
      const eventSummary = event.summary ? event.summary.toLowerCase() : '';

      if (assignmentKeywords.some(keyword => eventSummary.includes(keyword))) {
        const bufferStart = new Date(eventStart.getTime() - assignmentBuffer * 60 * 60 * 1000);
        if (currentTime < bufferStart) {
          freeTime.push({ start: currentTime, end: bufferStart });
        }
        currentTime = new Date(event.end.dateTime || event.end.date);
        return;
      }

      if (examKeywords.some(keyword => eventSummary.includes(keyword))) {
        const bufferStart = new Date(eventStart.getTime() - examBuffer * 60 * 60 * 1000);
        if (currentTime < bufferStart) {
          freeTime.push({ start: currentTime, end: bufferStart });
        }
        currentTime = new Date(event.end.dateTime || event.end.date);
        return;
      }

      if (currentTime < eventStart) {
        freeTime.push({ start: currentTime, end: eventStart });
      }
      currentTime = new Date(event.end.dateTime || event.end.date);
    });

    const endTime = new Date();
    endTime.setDate(endTime.getDate() + days);
    endTime.setHours(23, 59, 59, 999);

    if (currentTime < endTime) {
      freeTime.push({ start: currentTime, end: endTime });
    }

    console.log(`Free time slots for ${email}:`, freeTime);
    return freeTime;
  } catch (error) {
    console.error(`Error calculating free time for ${email}:`, error);
    throw error;
  }
};

const findOverlappingIntervals = (intervals1, intervals2) => {
  const overlapping = [];
  let i = 0, j = 0;

  while (i < intervals1.length && j < intervals2.length) {
    const start = new Date(Math.max(new Date(intervals1[i].start), new Date(intervals2[j].start)));
    const end = new Date(Math.min(new Date(intervals1[i].end), new Date(intervals2[j].end)));

    if (start < end) {
      overlapping.push({ start, end });
    }

    if (new Date(intervals1[i].end) < new Date(intervals2[j].end)) {
      i++;
    } else {
      j++;
    }
  }

  console.log(`Overlapping intervals:`, overlapping);
  return overlapping;
};

const calculateFreeTimeForMultipleUsers = async (users, findPotentialTimesUntil) => {
  try {
    console.log(`Raw findPotentialTimesUntil input:`, findPotentialTimesUntil);

    // Ensure `findPotentialTimesUntil` is a valid date
    const potentialUntilDate = new Date(findPotentialTimesUntil);
    if (isNaN(potentialUntilDate)) {
      throw new Error(`Invalid date provided for findPotentialTimesUntil: ${findPotentialTimesUntil}`);
    }

    // Calculate days until `findPotentialTimesUntil`
    const days = Math.ceil((potentialUntilDate - new Date()) / (24 * 60 * 60 * 1000));
    if (days <= 0) {
      console.warn(`Invalid findPotentialTimesUntil value (${findPotentialTimesUntil}). Days calculated: ${days}`);
      return []; // Return empty array if date range is invalid
    }

    console.log(`Days calculated: ${days}`);

    const allFreeTimes = [];

    for (const user of users) {
      console.log(`Calculating free time for user: ${user.email}`);
      const freeTime = await calculateFreeTime(user.email, days);
      console.log(`Free time slots for user ${user.email}:`, freeTime);
      allFreeTimes.push(freeTime);
    }

    // Find overlapping intervals across all users
    let combinedFreeTime = allFreeTimes[0];

    for (let i = 1; i < allFreeTimes.length; i++) {
      combinedFreeTime = findOverlappingIntervals(combinedFreeTime, allFreeTimes[i]);
    }

    // Group combined free times by date
    const combinedFreeTimeByDate = combinedFreeTime.reduce((acc, interval) => {
      const date = new Date(interval.start).toLocaleDateString('en-US');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(interval);
      return acc;
    }, {});

    const formattedCombinedFreeTime = Object.keys(combinedFreeTimeByDate).map(date => ({
      date,
      intervals: combinedFreeTimeByDate[date]
    }));

    console.log(`Final combined free time for multiple users:`, formattedCombinedFreeTime);
    return formattedCombinedFreeTime;
  } catch (error) {
    console.error('Error calculating free time for multiple users:', error);
    throw error;
  }
};

module.exports = {
  calculateFreeTime,
  calculateFreeTimeForMultipleUsers
};
