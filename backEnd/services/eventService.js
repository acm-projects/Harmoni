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
      const eventExists = userCalendar.events.some(e => 
        e.summary === event.summary &&
        new Date(e.start).getTime() === new Date(event.start.dateTime || event.start.date).getTime() &&
        new Date(e.end).getTime() === new Date(event.end.dateTime || event.end.date).getTime()
      );
      if (!eventExists) {
        const newEvent = {
          summary: event.summary,
          start: new Date(event.start.dateTime || event.start.date), // Store in UTC
          end: new Date(event.end.dateTime || event.end.date), // Store in UTC
          description: event.description
        };
        userCalendar.events.push(newEvent);
        console.log('Event saved:', newEvent);
      }
    });

    // Sort events by start date
    userCalendar.events.sort((a, b) => new Date(a.start) - new Date(b.start));
  }

  await user.save();
  console.log('User with events saved:', user);
};

const getCalendars = async (email) => {
  const user = await LoginInfo.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const calendars = user.calendars.map(calendar => ({
    calendarId: calendar.calendarId,
    summary: calendar.summary
  }));

  return calendars;
};

module.exports = {
  fetchEvents,
  getCalendars
};