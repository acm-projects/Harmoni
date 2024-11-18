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

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png",
        required: false
    },
    calendars: [calendarSchema],
    googleAuthSchema: googleAuthSchema
});

module.exports = mongoose.model('UserData', userSchema, "Credentials");
// module.exports = mongoose.model('User', userSchema);




  
//   const loginInfoSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email: String,
//     googleAuth: googleAuthSchema,
//     calendars: [calendarSchema]
//   });