const { google } = require('googleapis');
const LoginInfo = require('../models/loginInfo');
const { oauth2Client, checkAndRefreshToken } = require('./authService');

const fetchEvents = async (email) => {
  const user = await LoginInfo.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  await checkAndRefreshToken(user);

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const calendarList = await calendar.calendarList.list();

  for (const calendarListEntry of calendarList.data.items) {
    const calendarId = calendarListEntry.id;
    const calendarSummary = calendarListEntry.summary;

    const events = await calendar.events.list({
      calendarId: calendarId,
      timeMin: (new Date()).toISOString(),
      maxResults: 2500,
      singleEvents: true,
      orderBy: 'startTime'
    });

    console.log(`Fetched events for calendar ${calendarSummary}:`, events.data.items);

    // Find or create the calendar in the user's document
    let userCalendar = user.calendars.find(cal => cal.calendarId === calendarId);
    if (!userCalendar) {
      userCalendar = {
        calendarId: calendarId,
        summary: calendarSummary,
        events: []
      };
      user.calendars.push(userCalendar);
    }

    // Store events in the user's calendar without duplicating
    events.data.items.forEach(event => {
      const eventExists = userCalendar.events.some(e => e.id === event.id);
      if (!eventExists) {
        userCalendar.events.push(event);
      }
    });
  }

  await user.save();
  return user.calendars;
};

const getStoredEvents = async (email) => {
  const user = await LoginInfo.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  return user.calendars;
};

module.exports = {
  fetchEvents,
  getStoredEvents
};