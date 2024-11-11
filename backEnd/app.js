require('./models/dataBase')

const authRouter = require('./authentication/auth');
const groupRouter = require('./groups/group');
const googleAuthRouter = require('./authentication/googleAuth');
require('./authentication/passportAuth');
const express = require('express');
// const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8000;
const passport = require('passport');
const session = require('express-session');



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
// app.use(passport.initialize());
// app.use(passport.session());




//authRouter is a express.Router() object that contains all the routes for authentication and is connected to from app.js by the app.use() method
app.use('/', authRouter);
app.use('/', googleAuthRouter);
app.use('/', groupRouter);




//Test route to check if server is running
app.get('/', (req,res) => {
    res.send("<a href = http://localhost:8000/auth/google>click here<a/>"); 
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email','profile'] }),) 


app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
    // Successful authentication, redirect to a secure route
    console.log(req.user.emails[0].value);
    res.redirect('http://localhost:5173/TestHome');
});

app.get('/home',(req,res) => {
    console.log(req.user);
    res.redirect('http://localhost:5173/TestHome');
})




//Starts up the server and checks if it is listening on the port
app.listen(port, () => {//http://localhost:8000
    try {
        console.log("Port " + port +" is listening :)");
    } catch(e) {
        console.log("Port is not listening :(")
    }
})




//mongoPassword: JIOglWWCF4QRT3y4