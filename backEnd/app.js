const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const calendarRoutes = require('./routes/calendarRoutes');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/calendar', calendarRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});