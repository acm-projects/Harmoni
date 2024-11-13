const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const calendarRoutes = require('./routes/calendarRoutes');
const pollRoutes = require('./routes/pollRoutes');
const groupRoutes = require('./routes/groupRoutes'); // Import group routes
dotenv.config();

require('./models/dataBase')

const authRouter = require('./authentication/auth');
const groupRouter = require('./groups/group');
const googleAuthRouter = require('./authentication/googleAuth');
// const axios = require('axios');
const port = 8000;
const session = require('express-session');

const app = express()

app.use(cors()); //Ayman's Changes
app.use(express.json()); //Ayman's Changes

//These two lines are middleware
//cors(): allows cross-origin requests, giving frontend access to backend localhost server
//express.json(): allows express to parse json data
app.use(cors()); 
app.use(express.json()); 
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

//authRouter is a express.Router() object that contains all the routes for authentication and is connected to from app.js by the app.use() method
app.use('/', authRouter);
app.use('/', googleAuthRouter);
app.use('/', groupRouter);

//Test route to check if server is running
app.get('/', (req,res) => {
    res.send("<a href = http://localhost:8000/auth/google>click here<a/>"); 
})

app.get('/home',(req,res) => {
    console.log(req.user);
    res.redirect('http://localhost:5173/TestHome');
})

app.get('/home',(req,res) => {
    console.log(req.user);
    res.redirect('http://localhost:5173/TestHome');
})

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/poll', pollRoutes);
app.use('/api/group', groupRoutes); // Register group routes


//Starts up the server and checks if it is listening on the port
app.listen(port, () => {//http://localhost:8000
    try {
        console.log("Port " + port +" is listening :)");
    } catch(e) {
        console.log("Port is not listening :(")
    }
})




//mongoPassword: JIOglWWCF4QRT3y4
