const mongoose = require('mongoose');

const freeTimeSchema = new mongoose.Schema({
  email: String,
  freeTime: [{
    date: String,
    intervals: [{
      start: Date,
      end: Date
    }]
  }]
});

module.exports = mongoose.model('FreeTime', freeTimeSchema);