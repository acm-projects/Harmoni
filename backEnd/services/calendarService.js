const { google } = require('googleapis');
const moment = require('moment-timezone');
const LoginInfo = require('../models/loginInfo');
const FreeTime = require('../models/freeTime');
const dotenv = require('dotenv');
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.SECRET_ID,
  process.env.REDIRECT
);

const generateAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'profile'
    ]
  });
};

const getToken = async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens received:', tokens);

    // Get the user's email from Google People API
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const me = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names'
    });

    const email = me.data.emailAddresses[0].value;
    const firstName = me.data.names[0].givenName;
    const lastName = me.data.names[0].familyName;

    // Save tokens and user info to the database
    const user = await LoginInfo.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        email,
        googleAuth: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          scope: tokens.scope,
          token_type: tokens.token_type,
          expiry_date: tokens.expiry_date
        }
      },
      { new: true, upsert: true }
    );

    console.log('User updated with tokens:', user);
    return tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw new Error('Error getting tokens');
  }
};

const checkAndRefreshToken = async (user) => {
  try {
    oauth2Client.setCredentials({
      access_token: user.googleAuth.access_token,
      refresh_token: user.googleAuth.refresh_token,
      scope: user.googleAuth.scope,
      token_type: user.googleAuth.token_type,
      expiry_date: user.googleAuth.expiry_date
    });

    const tokens = oauth2Client.credentials;
    if (!tokens || !tokens.expiry_date || tokens.expiry_date <= Date.now()) {
      console.log('Token expired or not available, refreshing...');
      const newTokens = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(newTokens.credentials);
      console.log('Token refreshed:', newTokens.credentials);

      // Update the user's tokens in the database
      user.googleAuth.access_token = newTokens.credentials.access_token;
      user.googleAuth.expiry_date = newTokens.credentials.expiry_date;
      await user.save();
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Error refreshing token');
  }
};

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
  generateAuthUrl,
  getToken,
  fetchEvents,
  getCalendars,
  calculateFreeTime
};