const calendarService = require('../services/calendarService');

const initiateOAuth = (req, res) => {
  const url = calendarService.generateAuthUrl();
  res.redirect(url);
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

const calculateFreeTimeMultiple = async (req, res) => {
  const { users, days } = req.body;

  try {
    const freeTime = await calendarService.calculateFreeTimeMultiple(users, days);
    res.json(freeTime);
  } catch (error) {
    console.error('Error calculating free time:', error);
    res.status(500).send('Error calculating free time');
  }
};

module.exports = {
  initiateOAuth,
  fetchEvents,
  calculateFreeTimeMultiple
};