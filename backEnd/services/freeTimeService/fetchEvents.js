const { google } = require('googleapis');
const { oauth2Client, checkAndRefreshToken } = require('../authService');
const LoginInfo = require('../../models/loginInfo');

const fetchEventsForMultipleUsers = async (users, days) => {
  let allEvents = [];

  for (const userConfig of users) {
    const { email, ignoreCalendars, assignmentBuffer, examBuffer } = userConfig;
    const user = await LoginInfo.findOne({ email });
    if (!user) {
      throw Error(`User not found: ${email}`);
    }

    await checkAndRefreshToken(user);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

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

      allEvents = allEvents.concat(events.data.items.map(event => ({
        summary: event.summary,
        start: new Date(event.start.dateTime || event.start.date), // Store in UTC
        end: new Date(event.end.dateTime || event.end.date), // Store in UTC
        description: event.description,
        user: email,
        assignmentBuffer,
        examBuffer
      })));
    }
  }

  // Sort events by start time
  allEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

  return allEvents;
};

module.exports = {
  fetchEventsForMultipleUsers
};