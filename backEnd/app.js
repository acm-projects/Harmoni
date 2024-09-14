const { MongoClient } = require('mongodb'); //Ayman's Changes
const dotenv = require("dotenv") //Ayman's Changes

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8000;
dotenv.config(); //Ayman's Changes

app.use(cors()); //Ayman's Changes
app.use(express.json()); //Ayman's Changes

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(8000, () => {
    try {
        console.log("Port is listening :)");
    } catch(e) {
        console.log("Port is not listening :(")
    }
})



async function runMongo(){
    const MONGO_URI = "mongodb+srv://kartikjoshiron:<db_password>@harmonidatabase.f9go7.mongodb.net/?retryWrites=true&w=majority&appName=HarmoniDatabase"
    const dataBase = new MongoClient(MONGO_URI)
    
    try {
        await dataBase.connect();
        console.log("Database is connnected! :) ")
    } catch(e) {
        console.log("Database not connected :(")
    }
}



runMongo();