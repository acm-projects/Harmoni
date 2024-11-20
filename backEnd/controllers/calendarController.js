const calendarService = require('../services/calendarService');
const freeTimeService = require('../services/freeTimeService');
console.log('freeTimeService:', freeTimeService);
const userPreferencesService = require('../services/userPreferencesService'); // Import user preferences service

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

  try {
    const preferences = await userPreferencesService.getUserPreferences(email);
    const { ignoreCalendars, assignmentBuffer, examBuffer } = preferences;
    const { days } = req.body;

    const freeTime = await freeTimeService.calculateFreeTime(email, ignoreCalendars, days, assignmentBuffer, examBuffer);
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
  const { users, findPotentialTimesUntil } = req.body;

  try {
    const userPreferences = await Promise.all(users.map(async user => {
      const preferences = await userPreferencesService.getUserPreferences(user.email);
      return {
        email: user.email,
        ignoreCalendars: preferences.ignoreCalendars,
        assignmentBuffer: preferences.assignmentBuffer,
        examBuffer: preferences.examBuffer
      };
    }));

    const freeTime = await freeTimeService.calculateFreeTimeForMultipleUsers(userPreferences, findPotentialTimesUntil);
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
  getCalendars,
  calculateFreeTimeForMultipleUsers
};