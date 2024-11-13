const authService = require('./authService');
const eventService = require('./eventService');
const freeTimeService = require('./freeTimeService');

module.exports = {
  generateAuthUrl: authService.generateAuthUrl,
  getToken: authService.getToken,
  checkAndRefreshToken: authService.checkAndRefreshToken,
  fetchEvents: eventService.fetchEvents,
  getCalendars: eventService.getCalendars,
  calculateFreeTime: freeTimeService.calculateFreeTime
};