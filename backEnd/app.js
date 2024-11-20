const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');

// Route imports
const calendarRoutes = require('./routes/calendarRoutes');
const pollRoutes = require('./routes/pollRoutes');
const groupRoutes = require('./routes/groupRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userPreferencesRoutes = require('./routes/userPreferencesRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the new authRoutes

dotenv.config();

require('./models/dataBase');
require('./models/group'); // Ensure Group model is registered

const port = 8000;
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON data
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

// Test route to check if the server is running
app.get('/', (req, res) => {
  res.send('<a href="http://localhost:8000/auth/google">Click here to authenticate with Google</a>');
});

// Connect to MongoDB
connectDB();

// Use routes
app.use('/auth', authRoutes); // Register auth routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/poll', pollRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/user-preferences', userPreferencesRoutes);

// Starts up the server and checks if it is listening on the port
app.listen(port, () => {
  try {
    console.log('Port ' + port + ' is listening :)');
  } catch (e) {
    console.log('Port is not listening :(');
  }
});
