const calendarService = require('../services/calendarService');

const initiateOAuth = (req, res) => {
  const url = calendarService.generateAuthUrl();
  res.redirect(url);
};

const handleOAuthCallback = async (req, res) => {
  const code = req.query.code;
  console.log('Authorization code received:', code);

  try {
    const tokens = await calendarService.getToken(code);
    res.send('Successfully authenticated and tokens stored in MongoDB');
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    res.status(500).send('Error handling OAuth callback');
  }
};

const fetchEvents = async (req, res) => {
  const email = req.params.email;

  try {
    await calendarService.fetchEvents(email);
    res.send('Events fetched and stored in MongoDB');
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
};

const calculateFreeTime = async (req, res) => {
  const email = req.params.email;
  const { ignoreCalendars, days, assignmentBuffer, examBuffer } = req.body;

  try {
    const freeTime = await calendarService.calculateFreeTime(email, ignoreCalendars, days, assignmentBuffer, examBuffer);
    res.json(freeTime);
  } catch (error) {
    console.error('Error calculating free time:', error);
    res.status(500).send('Error calculating free time');
  }
};

const getCalendars = async (req, res) => {
  const email = req.params.email;

  try {
    const calendars = await calendarService.getCalendars(email);
    res.json(calendars);
  } catch (error) {
    console.error('Error fetching calendars:', error);
    res.status(500).send('Error fetching calendars');
  }
};

const calculateFreeTimeForMultipleUsers = async (req, res) => {
  const { users, days } = req.body;

  try {
    const freeTime = await freeTimeService.calculateFreeTimeForMultipleUsersAndFormat(users, days);
    res.json(freeTime);
  } catch (error) {
    console.error('Error calculating free time for multiple users:', error);
    res.status(500).send('Error calculating free time for multiple users');
  }
};

module.exports = {
  initiateOAuth,
  handleOAuthCallback,
  fetchEvents,
  calculateFreeTime,
  getCalendars // Export the new controller function
};