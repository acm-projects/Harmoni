const eventService = require('../services/eventService');

const fetchStoredEvents = async (req, res) => {
  const { email } = req.params;

  try {
    const calendars = await eventService.getStoredEvents(email);
    res.json(calendars);
  } catch (error) {
    console.error('Error fetching stored events:', error);
    res.status(500).send('Error fetching stored events');
  }
};

module.exports = {
  fetchStoredEvents
};