const mongoose = require('mongoose');
const googleAuthSchema = require('./googleAuth');

const eventSchema = new mongoose.Schema({
  summary: String,
  start: Date,
  end: Date,
  description: String
});

const calendarSchema = new mongoose.Schema({
  calendarId: String,
  summary: String,
  events: [eventSchema]
});

const loginInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  googleAuth: googleAuthSchema,
  calendars: [calendarSchema],
  ignoreCalendars: [String], // Add field for calendars to ignore
  assignmentBuffer: { type: Number, default: 0 }, // Add field for assignment buffer time
  examBuffer: { type: Number, default: 0 } // Add field for exam buffer time
});

module.exports = mongoose.model('LoginInfo', loginInfoSchema);