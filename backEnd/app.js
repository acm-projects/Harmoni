const express = require('express');
const mongoose = require('mongoose');
const { google } = require('googleapis');
const cors = require('cors'); // Add this line
const dotenv = require("dotenv") //Ayman's Changes
dotenv.config(); //Ayman's Changes

const app = express()

app.use(cors()); //Ayman's Changes
app.use(express.json()); //Ayman's Changes

// Load environment variables from a .env file
require('dotenv').config();

// Google OAuth2 setup
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.SECRET_ID,
  process.env.REDIRECT
);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for the calendar events
const eventSchema = new mongoose.Schema({
  summary: String,
  start: Date,
  end: Date,
  description: String
});

const Event = mongoose.model('Event', eventSchema, 'events');

// Route to initiate Google OAuth2 flow
app.get('/', (req, res) => {
  // Generate the Google authentication URL
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Request offline access to receive a refresh token
    scope: 'https://www.googleapis.com/auth/calendar.readonly' // Scope for read-only access to the calendar
  });
  // Redirect the user to Google's OAuth 2.0 server
  res.redirect(url);
});

// Route to handle the OAuth2 callback
app.get('/redirect', (req, res) => {
  // Extract the code from the query parameter
  const code = req.query.code;
  console.log('Authorization code received:', code);

  // Exchange the code for tokens
  oauth2Client.getToken(code, async (err, tokens) => {
    if (err) {
      // Handle error if token exchange fails
      console.error('Couldn\'t get token', err);
      res.send('Error');
      return;
    }
    console.log('Tokens received:', tokens);

    // Set the credentials for the Google API client
    oauth2Client.setCredentials(tokens);

    // Fetch events from Google Calendar
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    try {
      const events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
      });

      console.log('Fetched events:', events.data.items); // Log fetched events

      // Store events in MongoDB
      events.data.items.forEach(async (event) => {
        const newEvent = new Event({
          summary: event.summary,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          description: event.description
        });
        await newEvent.save();
        console.log('Event saved:', newEvent); // Log saved event
      });

      // Notify the user of a successful login and data storage
      res.send('Successfully logged in and events stored in MongoDB');
    } catch (error) {
      console.error('Error fetching events', error);
      res.send('Error fetching events');
    }
  });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
