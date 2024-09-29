require('./models/dataBase')

const authRouter = require('./authentication/auth');
const express = require('express');
// const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8000;
const User = require('./models/user');


//These two lines are middleware
//cors(): allows cross-origin requests, giving frontend access to backend localhost server
//express.json(): allows express to parse json data
app.use(cors()); 
app.use(express.json()); 




//authRouter is a express.Router() object that contains all the routes for authentication and is connected to from app.js by the app.use() method
app.use('/', authRouter);





//Test route to check if server is running
app.get('/', (req,res) => {
    res.send("Hello World!"); 
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

