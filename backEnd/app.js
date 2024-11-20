const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const calendarRoutes = require('./routes/calendarRoutes');
const pollRoutes = require('./routes/pollRoutes');
const groupRoutes = require('./routes/groupRoutes'); // Import group routes
const eventRoutes = require('./routes/eventRoutes'); // Import event routes
dotenv.config();

require('./models/dataBase');
require('./models/group'); // Ensure Group model is registered

const authRouter = require('./authentication/auth');
const groupRouter = require('./groups/group');
const googleAuthRouter = require('./authentication/googleAuth');
// const axios = require('axios');
const port = 8000;
const session = require('express-session');

const app = express();

app.use(cors()); // Ayman's Changes
app.use(express.json()); // Ayman's Changes

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/poll', pollRoutes);
app.use('/api/group', groupRoutes); // Register group routes
app.use('/api/event', eventRoutes); // Register event routes

// Starts up the server and checks if it is listening on the port
app.listen(port, () => {
  try {
    console.log('Port ' + port + ' is listening :)');
  } catch (e) {
    console.log('Port is not listening :(');
  }
});
