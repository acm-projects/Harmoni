const { google } = require('googleapis');
const moment = require('moment-timezone');
const LoginInfo = require('../models/loginInfo');
const FreeTime = require('../models/freeTime');
const { oauth2Client, checkAndRefreshToken } = require('./authService');

const calculateFreeTime = async (email, ignoreCalendars, days, assignmentBuffer, examBuffer) => {
  const user = await LoginInfo.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  await checkAndRefreshToken(user);

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  let allEvents = [];

  for (const calendarListEntry of user.calendars) {
    if (ignoreCalendars.includes(calendarListEntry.calendarId)) {
      continue;
    }

    const events = await calendar.events.list({
      calendarId: calendarListEntry.calendarId,
      timeMin: (new Date()).toISOString(),
      timeMax: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(), // Limit to specified days
      maxResults: 2500,
      singleEvents: true,
      orderBy: 'startTime'
    });

    allEvents = allEvents.concat(events.data.items);
  }

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
    const eventSummary = event.summary.toLowerCase();

    // Check for assignment keywords
    if (assignmentKeywords.some(keyword => eventSummary.includes(keyword))) {
      const bufferStart = new Date(eventStart.getTime() - assignmentBuffer * 60 * 60 * 1000);
      if (currentTime < bufferStart) {
        freeTime.push({ start: currentTime, end: bufferStart });
        console.log('Free time added before assignment:', { start: currentTime, end: bufferStart });
      }
      currentTime = new Date(event.end.dateTime || event.end.date); // Use UTC
      console.log('Current time updated to after assignment:', currentTime);
      return;
    }

    // Check for exam keywords
    if (examKeywords.some(keyword => eventSummary.includes(keyword))) {
      const bufferStart = new Date(eventStart.getTime() - examBuffer * 60 * 60 * 1000);
      if (currentTime < bufferStart) {
        freeTime.push({ start: currentTime, end: bufferStart });
        console.log('Free time added before exam:', { start: currentTime, end: bufferStart });
      }
      currentTime = new Date(event.end.dateTime || event.end.date); // Use UTC
      console.log('Current time updated to after exam:', currentTime);
      return;
    }

    // Regular event
    if (currentTime < eventStart) {
      freeTime.push({ start: currentTime, end: eventStart });
      console.log('Free time added:', { start: currentTime, end: eventStart });
    }
    currentTime = new Date(event.end.dateTime || event.end.date); // Use UTC
    console.log('Current time updated to:', currentTime);
  });

  // Add remaining free time until the end of the specified period
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + days); // Adjust as needed for the specified number of days
  endTime.setHours(23, 59, 59, 999); // End at the end of the day
  console.log('End time:', endTime);
  if (currentTime < endTime) {
    freeTime.push({ start: currentTime, end: endTime });
    console.log('Remaining free time added:', { start: currentTime, end: endTime });
  }

  // Group free time by date
  const freeTimeByDate = freeTime.reduce((acc, interval) => {
    const date = interval.start.toLocaleDateString('en-US');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(interval);
    return acc;
  }, {});

  // Format free time for storage
  const formattedFreeTime = Object.keys(freeTimeByDate).map(date => ({
    date,
    intervals: freeTimeByDate[date]
  }));

  // Save free time to the database
  await FreeTime.findOneAndUpdate(
    { email },
    { email, freeTime: formattedFreeTime },
    { new: true, upsert: true }
  );

  console.log('Free time calculated and stored:', formattedFreeTime);

  // Format free time for display in CDT
  const formattedFreeTimeForDisplay = formattedFreeTime.map(day => ({
    date: day.date,
    intervals: day.intervals.map(interval => ({
      start: moment(interval.start).tz('America/Chicago').format('YYYY-MM-DD hh:mm A z'),
      end: moment(interval.end).tz('America/Chicago').format('YYYY-MM-DD hh:mm A z')
    }))
  }));

  console.log('Free time formatted for display:', formattedFreeTimeForDisplay);
  return formattedFreeTimeForDisplay;
};

module.exports = {
  calculateFreeTime
};