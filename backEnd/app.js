const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const calendarRoutes = require('./routes/calendarRoutes');
const pollRoutes = require('./routes/pollRoutes');
const groupRoutes = require('./routes/groupRoutes'); // Import group routes
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/poll', pollRoutes);
app.use('/api/group', groupRoutes); // Register group routes

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});